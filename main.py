import random, string, json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.database import SessionLocal
from app.models import Player

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción limita al dominio del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Diccionario: { game_id: { player_name: websocket } }
games = {}


def generate_game_code(length=5):
    """Genera un código único de sala, ej: 'X7K9Q'"""
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=length))


@app.post("/create_game")
def create_game():
    code = generate_game_code()
    while code in games:  # asegurar que no se repite
        code = generate_game_code()
    games[code] = {}
    return {"game_id": code}


async def broadcast(game_id: str, message: dict):
    """Enviar un mensaje JSON a todos los jugadores de la sala"""
    data = json.dumps(message)
    for ws in games[game_id].values():
        await ws.send_text(data)


async def update_player_list(game_id: str):
    """Notificar lista de jugadores conectados"""
    players = list(games[game_id].keys())
    await broadcast(game_id, {"type": "players", "players": players})


@app.websocket("/ws/{game_id}/{player_name}")
async def join_game(websocket: WebSocket, game_id: str, player_name: str):
    await websocket.accept()
    if game_id not in games:
        games[game_id] = {}
    games[game_id][player_name] = websocket

    await update_player_list(game_id)

    try:
        while True:
            msg = await websocket.receive_text()
            # Soon to be extended for more message types
            await broadcast(game_id, {"type": "chat", "from": player_name, "msg": msg})
    except WebSocketDisconnect:
        del games[game_id][player_name]
        if games[game_id]:
            await update_player_list(game_id)
        else:
            del games[game_id]


@app.post("/start_game/{game_id}")
async def start_game(game_id: str):
    if game_id not in games or not games[game_id]:
        return {"error": "No hay jugadores conectados en esta partida"}

    db = SessionLocal()
    all_players = db.query(Player).all()
    db.close()

    if not all_players:
        return {"error": "No hay jugadores en la base de datos"}

    secret_word = random.choice(all_players).name
    impostor = random.choice(list(games[game_id].keys()))

    # Enviar roles individuales
    for player_name, websocket in games[game_id].items():
        if player_name == impostor:
            role = "Eres el impostor!"
        else:
            role = f"La palabra secreta es: {secret_word}"
        await websocket.send_text(json.dumps({"type": "role", "role": role}))

    # Avisar que arrancó la partida
    await broadcast(game_id, {"type": "system", "msg": "La partida ha comenzado"})

    return {
        "message": f"Partida {game_id} iniciada con {len(games[game_id])} jugadores"
    }
