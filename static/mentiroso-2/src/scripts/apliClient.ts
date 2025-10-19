
export async function createGame(): Promise<{ game_id: string }> {
    const res = await fetch("http://localhost:8000/create_game", { method: "POST" });
    if (!res.ok) {
        throw new Error("Failed to create game");
    }
    return res.json();
}


export function joinGame(event: Event) {
    event.preventDefault();
    const gameId = (document.getElementById("gameId") as HTMLInputElement).value;
    const playerName = (document.getElementById("playerName") as HTMLInputElement).value;
    if (!gameId || !playerName) {
        alert("Introduce código de sala y tu nombre");
        return;
    }
    window.location.href = `/game/${gameId}?player=${encodeURIComponent(playerName)}`;
}
