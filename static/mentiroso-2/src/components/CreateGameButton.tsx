import React, { useState } from "react";
import PlayerNameModal from "./PlayerNameModal";
import { createGame } from "../scripts/apliClient";

const CreateGameButton: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleCreateGame = async (playerName: string) => {
        setIsCreating(true);
        console.log("Creating game with player:", playerName);

        try {
            const data = await createGame(playerName);
            console.log("Game created successfully:", data);
            window.location.href = `/game/${data.game_id}?player=${encodeURIComponent(playerName)}`;
        } catch (error) {
            console.error("Error creating game:", error);
            setIsCreating(false);
        }
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="group relative w-full py-4 rounded-2xl font-black text-xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 text-white shadow-2xl shadow-green-900/50 hover:shadow-emerald-500/60 hover:scale-[1.03] active:scale-95 transition-all duration-300 overflow-hidden border-2 border-white/20"
            >

                <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/0 via-emerald-300/30 to-green-400/0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

                {/* Content */}
                <span className="relative flex items-center justify-center gap-3">
                    <svg
                        className="w-6 h-6 animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                    </svg>
                    <span className="tracking-wide">CREAR PARTIDO</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
                        <path d="M177.1 228.6L207.9 320h96.5l29.62-91.38L256 172.1L177.1 228.6zM255.1 0C114.6 0 .0001 114.6 .0001 256S114.6 512 256 512s255.1-114.6 255.1-255.1S397.4 0 255.1 0zM416.6 360.9l-85.4-1.297l-25.15 81.59C290.1 445.5 273.4 448 256 448s-34.09-2.523-50.09-6.859L180.8 359.6l-85.4 1.297c-18.12-27.66-29.15-60.27-30.88-95.31L134.3 216.4L106.6 135.6c21.16-26.21 49.09-46.61 81.06-58.84L256 128l68.29-51.22c31.98 12.23 59.9 32.64 81.06 58.84L377.7 216.4l69.78 49.1C445.8 300.6 434.8 333.2 416.6 360.9z" />
                    </svg>
                </span>

                {/* Shine effect */}
                <span className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:left-full transition-all duration-700 ease-out skew-x-12"></span>
            </button>

            <PlayerNameModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleCreateGame}
                isLoading={isCreating}
            />
        </>
    );
};

export default CreateGameButton;