import React from "react";
import { useParams, useLocation } from "react-router-dom";
import RoleDisplay from "../components/RoleDisplay";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const GamePage: React.FC = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const query = useQuery();
    const playerName = query.get("player") || "Jugador";

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
            {/* Campo de fútbol background */}
            <div className="absolute inset-0">
                {/* Línea central */}
                <div className="absolute left-1/2 top-0 w-1 h-full bg-white/20 transform -translate-x-1/2" />
                {/* Círculo central */}
                <div className="absolute left-1/2 top-1/2 w-40 h-40 border-4 border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                {/* Líneas horizontales */}
                <div className="absolute left-0 top-20 w-full h-px bg-white/10" />
                <div className="absolute left-0 bottom-20 w-full h-px bg-white/10" />
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 w-full max-w-2xl px-4">
                <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-green-50 to-green-100 drop-shadow-2xl">
                    Sala {gameId}
                </h1>
                <h2 className="text-xl mb-8 text-green-200 font-semibold tracking-wide">
                    Jugador: {playerName}
                </h2>

                {/* Aquí mostramos el rol */}
                <RoleDisplay gameId={gameId ?? ""} playerName={playerName} />
            </div>
        </div>
    );
};

export default GamePage;
