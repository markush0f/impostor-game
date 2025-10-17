import random, string
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.database import SessionLocal
from app.models import Player

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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


@app.websocket("/ws/{game_id}/{player_name}")
async def websocket_endpoint(websocket: WebSocket, game_id: str, player_name: str):
    await websocket.accept()
    if game_id not in games:
        games[game_id] = {}
    games[game_id][player_name] = websocket
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        del games[game_id][player_name]
        if not games[game_id]:
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

    for player_name, websocket in games[game_id].items():
        if player_name == impostor:
            role = "Eres el impostor!"
        else:
            role = f"La palabra secreta es: {secret_word}"
        await websocket.send_text(role)

    return {
        "message": f"Partida {game_id} iniciada con {len(games[game_id])} jugadores"
    }
