from email import message
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
import random
import smtplib
from dotenv import load_dotenv
from fastapi import FastAPI, Form, Path
from pathlib import Path as FilePath


app = FastAPI()

load_dotenv()

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")

# Guardamos jugadores temporalmente
players = {}


# Cargamos nuestro html
def load_template(player: str, role: str) -> str:
    template_path = FilePath("email_template.html")
    html = template_path.read_text(encoding="utf-8")
    html = html.replace("{{player}}", player)
    html = html.replace("{{role}}", role)
    return html


@app.post("/register")
def register(name: str = Form(...), email: str = Form(...)):
    players[name] = email
    return {"message": f"{name} registrado!"}


@app.get("/user-list")
def user_list():
    return {
        "players": players,
    }


@app.post("/start_game")
def start_game():
    words = ["Messi", "Cristiano", "Benzema", "Neymar"]
    secret_word = random.choice(words)
    impostor = random.choice(list(players.keys()))

    roles = {}
    for player in players:
        if player == impostor:
            roles[player] = "Eres el impostor!"
        else:
            roles[player] = f"La palabra secreta es: {secret_word}"

    # Enviar correos
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)

        for player, email in players.items():
            message = MIMEMultipart("alternative")
            message["From"] = SENDER_EMAIL
            message["To"] = email
            message["Subject"] = "Tu rol en el Impostor de Fútbol ⚽"

            role_text = roles[player]
            html_body = load_template(player, role_text)

            message.attach(MIMEText(html_body, "html"))

            server.sendmail(
                SENDER_EMAIL,
                email,
                message.as_string(),
            )

    return {
        "message": "Roles enviados a cada jugador",
    }
