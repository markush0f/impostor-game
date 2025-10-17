import os
import math
import pandas as pd
from dotenv import load_dotenv
from openai import OpenAI
from sqlalchemy.dialects.sqlite import insert
from database import SessionLocal, engine
from app.models import Player, Base

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Ensure table exists
Base.metadata.create_all(bind=engine)

# Load CSV
df = pd.read_csv("football_players.csv", usecols=["name"])
names = df["name"].dropna().unique().tolist()
total = len(names)

# Split into 5 independent chunks (20% each)
chunk_size = math.ceil(total / 5)
chunks = [names[i : i + chunk_size] for i in range(0, total, chunk_size)]

session = SessionLocal()
total_saved = 0

for idx, batch in enumerate(chunks, start=1):
    print(f"\n⏳ Sending chunk {idx} ({len(batch)} players)...")

    prompt = f"""
    You are an expert in professional football worldwide.
    Here is a list of football players.
    Return ONLY the names that are internationally recognized and well-known by football fans worldwide (including football geeks/enthusiasts).
    A player is famous if he has played in top professional leagues (Premier League, La Liga, Serie A, Bundesliga, Ligue 1), continental competitions (Champions League, Europa League, Copa Libertadores), or for a national team. 
    Fame also includes legendary retired players.

    Do not explain. 
    Do not add numbering. 
    Return one name per line.

    Players:
    {chr(10).join(batch)}
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )

    famous_names = set(response.choices[0].message.content.strip().split("\n"))

    count = 0
    for name in famous_names:
        name = name.strip()
        if not name:
            continue
        stmt = insert(Player).values(name=name).prefix_with("OR IGNORE")
        session.execute(stmt)
        count += 1

    session.commit()
    total_saved += count
    print(f"Chunk {idx} saved {count} famous players.")

session.close()
print(f"\nFinished! Total famous players saved: {total_saved}")
