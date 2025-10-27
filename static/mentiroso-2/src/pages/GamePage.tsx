import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const GamePage: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const query = useQuery();
    const playerName = query.get("player") || "Jugador";
    const isHost = query.get("host") === "true";

    const [role, setRole] = useState<string>("");
    const [players, setPlayers] = useState<string[]>([]);
    const [status, setStatus] = useState<string>("Conectando...");

    useEffect(() => {
        if (!gameId || !playerName) return;

        const socket = new WebSocket(`ws://localhost:8000/ws/${gameId}/${playerName}`);

        socket.onopen = () => {
            setStatus(`Conectado a la sala ${gameId} como ${playerName}`);
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === "players") {
                    setPlayers(data.players);
                }

                if (data.type === "role") {
                    setRole(data.role);
                }

                if (data.type === "system") {
                    console.log("📢", data.msg);
                }
            } catch (err) {
                console.error("Error parsing WS message:", err, event.data);
            }
        };

        socket.onclose = () => {
            setStatus("❌ Desconectado");
        };

        return () => {
            socket.close();
        };
    }, [gameId, playerName]);

    const startGame = async () => {
        try {
            const res = await fetch(`http://localhost:8000/start_game/${gameId}`, {
                method: "POST",
            });
            const data = await res.json();
            alert(data.message || "Partida iniciada");
        } catch (err) {
            alert("Error al iniciar la partida");
            console.error(err);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute left-1/2 top-0 w-1 h-full bg-white/20 transform -translate-x-1/2" />
                <div className="absolute left-1/2 top-1/2 w-40 h-40 border-4 border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-0 top-20 w-full h-px bg-white/10" />
                <div className="absolute left-0 bottom-20 w-full h-px bg-white/10" />
            </div>

            <div className="relative z-10 w-full max-w-2xl px-4">
                <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-green-50 to-green-100 drop-shadow-2xl">
                    Sala {gameId}
                </h1>
                <h2 className="text-xl mb-2 text-green-200 font-semibold tracking-wide">
                    Jugador: {playerName}
                </h2>
                <h3 className="mb-6 text-sm text-green-300">{status}</h3>

                <div className="mb-8 bg-white/10 p-4 rounded-xl">
                    <h3 className="text-lg font-bold mb-2">👥 Jugadores en la sala:</h3>
                    <ul className="space-y-1">
                        {players.map((p, idx) => (
                            <li key={idx} className="text-green-100">
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>

                {isHost && (
                    <button
                        onClick={startGame}
                        className="mb-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-lg font-bold"
                    >
                        🚀 Iniciar partida
                    </button>
                )}

                {role && (
                    <div className="p-6 bg-gradient-to-br from-green-700 to-green-600 rounded-2xl shadow-lg text-2xl font-semibold">
                        🎭 Tu rol: {role}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GamePage;
