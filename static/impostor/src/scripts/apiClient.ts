export async function createGame() {
    const res = await fetch("http://localhost:8000/create_game", { method: "POST" });
    const data = await res.json();
    alert(`Sala creada: ${data.game_id}`);
    // Redirigir a la sala
    window.location.href = `/game/${data.game_id}`;
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
