import Deck from "./deck.ts";
import Card from "./card.ts";

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

export default Game;