import Card from "./card.ts";

class Deck {

    cards!: Card[];

    constructor() {
        this.cards = [];
        this.createDeck();
        this.shuffleDeck();
    }

    private createDeck(): void {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const ranks = ['3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace', '2'];

        for (const suit of suits) {
            for (const rank of ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
    }

    private shuffleDeck(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    public dealCards(numberOfCards: number): Card[] {
        return this.cards.splice(0, numberOfCards);
    }
}


export default Deck;