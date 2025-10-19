import React, { useEffect, useState } from "react";

interface RoleDisplayProps {
    gameId: string;
    playerName: string;
}

const RoleDisplay: React.FC<RoleDisplayProps> = ({ gameId, playerName }) => {
    const [status, setStatus] = useState("Conectando...");
    const [role, setRole] = useState("");

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/${gameId}/${playerName}`);

        socket.onopen = () => {
            setStatus(`✅ Conectado a la sala ${gameId} como ${playerName}`);
        };

        socket.onmessage = (event) => {
            setRole(`Tu rol: ${event.data}`);
        };

        socket.onclose = () => {
            setStatus("❌ Desconectado");
        };

        return () => {
            socket.close();
        };
    }, [gameId, playerName]);

    return (
        <div className="p-6 bg-gray-800/90 rounded-xl shadow-lg border border-gray-700 mt-6">
            <div id="status" className="mb-4 text-green-300 font-medium">
                {status}
            </div>
            <div id="role" className="text-xl font-semibold text-white">
                {role}
            </div>
        </div>
    );
};

export default RoleDisplay;
