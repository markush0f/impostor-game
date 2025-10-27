import React, { useState } from "react";

interface PlayerNameModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string) => void;
    isLoading?: boolean;
}

const PlayerNameModal: React.FC<PlayerNameModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false
}) => {
    const [playerName, setPlayerName] = useState("");

    const handleSubmit = () => {
        if (playerName.trim()) {
            onSubmit(playerName.trim());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && playerName.trim() && !isLoading) {
            handleSubmit();
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setPlayerName("");
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={handleClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 max-w-md w-full border-2 border-green-500/30 shadow-2xl shadow-green-500/20 animate-scaleIn">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-30"></div>

                {/* Content */}
                <div className="relative">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg shadow-green-500/50">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2">¡Bienvenido Capitán! ⚽</h2>
                        <p className="text-green-300/70 text-sm font-medium">Introduce tu nombre para crear el partido</p>
                    </div>

                    {/* Input */}
                    <div className="mb-6">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-30 group-hover:opacity-50 blur transition duration-300"></div>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Tu nombre"
                                    autoFocus
                                    disabled={isLoading}
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/90 border-2 border-gray-700/50 text-white placeholder-gray-400 font-semibold text-base focus:outline-none focus:border-green-500/50 focus:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                        {!playerName.trim() && (
                            <p className="mt-2 text-xs text-red-400/70 font-medium ml-1">* El nombre es obligatorio</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleClose}
                            disabled={isLoading}
                            className="flex-1 py-3 rounded-xl font-bold text-base bg-gray-700/50 text-gray-300 hover:bg-gray-700 active:scale-95 transition-all duration-200 border border-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!playerName.trim() || isLoading}
                            className="flex-1 py-3 rounded-xl font-bold text-base bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Creando...</span>
                                </>
                            ) : (
                                <>
                                    <span>Crear Partido</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerNameModal;