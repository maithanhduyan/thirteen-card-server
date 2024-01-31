import Game from "./game.ts";

export function handleWebSocket(req: Request): Response {
    const { socket, response } = Deno.upgradeWebSocket(req);

    socket.addEventListener("open", async () => {
        console.log("WebSocket client connected");
        await new Game().setSocket(socket);
    });

    socket.addEventListener("message", (event) => {

    });

    socket.addEventListener("close", () => {
        console.log("WebSocket client disconnected");
    });

    return response;
}
