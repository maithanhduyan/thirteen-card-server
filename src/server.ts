/**
 * gamebai-server deno project
 */
import Deck from "./deck.ts";
import Card from "./card.ts";

const HOME_ROUTE = new URLPattern({ pathname: "/" });
const WEB_SOCKET_ROUTE = new URLPattern({ pathname: "/websocket" });


class Game {
  player_hand: Card[];
  deck: Deck;
  socket: WebSocket;

  constructor(socket: WebSocket) {
    this.deck = new Deck();
    this.player_hand = [];
    this.socket = socket;
  }

  public dealCard() {
    this.player_hand = this.deck.dealCards(13);
    const responseObject = {
      server_command: "CHIA_BAI",
      data: this.player_hand
    };
    const json_response = JSON.stringify(responseObject);
    this.socket.send(json_response);
  }

}

Deno.serve({ hostname: "0.0.0.0", port: 8000 }, (req) => {
  const match_home_url = HOME_ROUTE.exec(req.url);
  const match_websocket_url = WEB_SOCKET_ROUTE.exec(req.url);

  if (match_home_url) {
    return new Response("Welcome Deno Web App");
  }

  if (req.url.endsWith("favicon.ico")) {
    return new Response(null, { status: 404 });
  }

  if (match_websocket_url) {
    console.log("match_websocket_url");
    if (req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }

    const { socket, response } = Deno.upgradeWebSocket(req);

    socket.addEventListener("open", () => {
      console.log("WebSocket client connected!");
    });

    socket.addEventListener("message", (event) => {
      switch (event.data) {
        case "ping": socket.send("pong"); break;
        case "CHIA_BAI":
          const game = new Game(socket);
          game.dealCard();
          break;
        default: socket.send(JSON.stringify("Not Found")); break;
      }
    });

    socket.addEventListener("close", (event) => {
      console.log("WebSocket client disconnected.");
    });

    return response;
  }

  // Nếu không khớp với bất kỳ route nào
  return new Response("Not Found", { status: 404 });
});
