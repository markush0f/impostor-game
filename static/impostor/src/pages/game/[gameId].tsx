import React from "react";
import { useParams, useLocation } from "react-router-dom";
import BaseLayout from "../../layouts/BaseLayout.astro";
import RoleDisplay from "../../components/RoleDisplay.astro";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const GamePage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const query = useQuery();
  const playerName = query.get("player") || "";

  return (
    <BaseLayout title={`Room ${gameId}`}>
      <main className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold mb-4">Room: {gameId}</h1>
        <h2 className="mb-6">Player: {playerName}</h2>

        <RoleDisplay gameId={gameId ?? ""} playerName={playerName} />
      </main>
    </BaseLayout>
  );
};

export default GamePage;
