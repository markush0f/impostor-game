import random
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Form, WebSocket, WebSocketDisconnect
from pathlib import Path as FilePath
from app.models import Player
from app.database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
load_dotenv()

# Registered players (from /register)
players = {}

# Connected players (via WebSocket)
connected_players = {}


# def load_template(player: str, role: str) -> str:
#     template_path = FilePath("email_template.html")
#     html = template_path.read_text(encoding="utf-8")
#     html = html.replace("{{player}}", player)
#     html = html.replace("{{role}}", role)
#     return html


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/register")
def register(name: str = Form(...), email: str = Form(...)):
    players[name] = email
    return {"message": f"{name} registered!"}


@app.get("/user-list")
def user_list():
    return {"players": list(players.keys())}


# WebSocket connection for each player
@app.websocket("/ws/{player_name}")
async def websocket_endpoint(websocket: WebSocket, player_name: str):
    await websocket.accept()
    connected_players[player_name] = websocket
    try:
        while True:
            await websocket.receive_text()  # Keep connection alive
    except WebSocketDisconnect:
        del connected_players[player_name]


@app.post("/start_game")
async def start_game():
    db = SessionLocal()
    all_players = db.query(Player).all()
    db.close()

    if not all_players:
        return {"error": "No players available in database"}

    # Pick secret word (from famous players DB)
    secret_word = random.choice(all_players).name

    if not connected_players:
        return {"error": "No players connected"}

    # Pick impostor among connected players
    impostor = random.choice(list(connected_players.keys()))

    # Assign roles and send via WebSocket
    for player_name, websocket in connected_players.items():
        if player_name == impostor:
            role = "Eres el impostor!"
        else:
            role = f"La palabra secreta es: {secret_word}"
        await websocket.send_text(role)

    return {"message": "Game started, roles sent to connected players"}
