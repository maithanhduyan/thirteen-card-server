/**
 * Game Manager
 */
import Deck from "./deck.ts";
import Card from "./card.ts";

class Game {
    player_hand!: Card[];
    deck!: Deck;
    socket!: WebSocket;

    constructor() {
        this.deck = new Deck();
        this.player_hand = [];
    }

    setSocket(socket: WebSocket) {
        this.socket = socket;
        this.socket.onmessage = this.handleMessageReceived.bind(this);
    }

    private dealCard() {
        this.deck = new Deck();
        this.player_hand = this.deck.dealCards(13);
        const responseObject = {
            server_command: "CHIA_BAI",
            data: this.player_hand
        };
        const json_response = JSON.stringify(responseObject);
        this.socket.send(json_response);
    }

    private handleMessageReceived(event: MessageEvent): void {
        console.log(event.data);
        switch (event.data) {
            case "ping": this.ping(); break;
            case "CHIA_BAI": this.dealCard(); break;
            case "JOIN": this.playerJoinRoom(); break;
            default: this.onErrors; break;
        }
    }

    private playerJoinRoom() {

    }

    private ping() {
        this.socket.send("pong")
    }

    private onErrors() {
        this.socket.send(JSON.stringify("Not Found"))
    }
}
export default Game;