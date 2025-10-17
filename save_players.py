import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

# Configuración DB
DATABASE_URL = "sqlite:///./players.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)


class Player(Base):
    __tablename__ = "players"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)

df = pd.read_csv("football_players.csv", usecols=["name"])

session = SessionLocal()
for _, row in df.iterrows():
    player = Player(name=row["name"])
    session.add(player)
session.commit()
session.close()

print(f"Guardados {len(df)} jugadores en la base de datos")
