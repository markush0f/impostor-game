import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinGameForm: React.FC = () => {
    const [gameId, setGameId] = useState("");
    const [playerName, setPlayerName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!gameId || !playerName) {
            alert("Introduce código de sala y tu nombre");
            return;
        }
        navigate(`/game/${gameId}?player=${encodeURIComponent(playerName)}`);
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Input de código de sala */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Código de sala"
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/90 border-2 border-gray-700/50 text-white placeholder-gray-400 font-semibold text-base focus:outline-none focus:border-blue-500/50 focus:bg-gray-800 transition-all duration-300"
                    />
                </div>
            </div>

            {/* Input de nombre de jugador */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Tu nombre"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/90 border-2 border-gray-700/50 text-white placeholder-gray-400 font-semibold text-base focus:outline-none focus:border-blue-500/50 focus:bg-gray-800 transition-all duration-300"
                    />
                </div>
            </div>

            {/* Botón de unirse */}
            <button
                type="submit"
                className="group relative w-full py-4 rounded-2xl font-black text-xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 text-white shadow-2xl shadow-blue-900/50 hover:shadow-blue-500/60 hover:scale-[1.03] active:scale-95 transition-all duration-300 overflow-hidden border-2 border-white/20 mt-2"
            >
                {/* Glow effect */}
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-cyan-300/30 to-blue-400/0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

                {/* Content */}
                <span className="relative flex items-center justify-center gap-3">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                    </svg>
                    <span className="tracking-wide">UNIRSE A PARTIDO</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                </span>

                {/* Shine effect */}
                <span className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:left-full transition-all duration-700 ease-out skew-x-12"></span>
            </button>

            {/* Indicador de ayuda */}
            <div className="flex items-center justify-center gap-2 text-blue-300/50 text-xs mt-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                    ></path>
                </svg>
                <span className="font-medium">Introduce el código compartido por el anfitrión</span>
            </div>
        </form>
    );
};

export default JoinGameForm;
