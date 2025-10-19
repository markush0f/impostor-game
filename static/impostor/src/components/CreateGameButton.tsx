import React from 'react';
import { createGame } from '../scripts/apiClient';

export default function CreateGameButton() {
  const handleClick = async () => {
    console.log('Crear Partida button clicked');
    try {
      await createGame();
    } catch (error) {
      console.error('Error al crear la partida:', error);
    }
  };

  return (
    <button
      className="w-full py-3 bg-green-600 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
      onClick={handleClick}
    >
      🎮 Crear Partida
    </button>
  );
}


