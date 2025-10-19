import React from "react";
import CreateGameButton from "../components/CreateGameButton";
import JoinGameForm from "../components/JoinGameForm";

const HomePage: React.FC = () => {
    return (
        <main className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
            {/* Campo de fútbol background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
                {/* Línea central vertical */}
                <div className="absolute left-1/2 top-0 w-1 h-full bg-white/20 transform -translate-x-1/2" />

                {/* Círculo central */}
                <div className="absolute left-1/2 top-1/2 w-40 h-40 border-4 border-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2" />

                {/* Líneas horizontales */}
                <div className="absolute left-0 top-20 w-full h-px bg-white/10" />
                <div className="absolute left-0 bottom-20 w-full h-px bg-white/10" />
            </div>

            {/* Partículas flotantes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
                <div className="absolute top-40 right-20 w-3 h-3 bg-white/20 rounded-full animate-pulse" />
                <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
                <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-pulse" />
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 w-full max-w-md px-4">
                {/* Título con efecto 3D */}
                <div className="mb-12">
                    <div className="relative inline-block">
                        <h1 className="text-6xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-b from-white via-green-50 to-green-100 drop-shadow-2xl tracking-tight">
                            IMPOSTOR
                        </h1>
                        <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 blur-3xl -z-10" />
                    </div>
                    <p className="text-green-200 text-lg font-semibold tracking-wider">
                        FÚTBOL CHALLENGE
                    </p>
                </div>

                {/* Card principal con efecto de estadio */}
                <div className="relative group">
                    {/* Glow del card */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />

                    {/* Card */}
                    <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border-2 border-white/10">
                        {/* Decoración superior */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-2 rounded-full border-4 border-gray-900 shadow-lg">
                                <span className="text-white font-bold text-sm tracking-widest">
                                    SALA DE JUEGO
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-6">
                            <CreateGameButton />

                            {/* Divisor con estilo de campo */}
                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t-2 border-dashed border-green-500/30" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-gray-900 px-4 text-green-400 text-sm font-bold tracking-wider flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        O
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    </span>
                                </div>
                            </div>

                            <JoinGameForm />
                        </div>

                        {/* Decoración inferior */}
                        <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="flex items-center justify-center gap-4 text-green-300/60 text-xs font-semibold">
                                <div className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span>EN VIVO</span>
                                </div>
                                <span>•</span>
                                <span>MULTIJUGADOR</span>
                                <span>•</span>
                                <span>TIEMPO REAL</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Texto inferior */}
                <div className="mt-8 text-green-200/60 text-sm font-medium">
                    <p>Encuentra al impostor entre los jugadores</p>
                </div>
            </div>
        </main>
    );
};

export default HomePage;
