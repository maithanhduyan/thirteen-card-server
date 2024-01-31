class Card {

    name: string;

    constructor(public rank: string, public suit: string) {
        this.suit = suit;
        this.rank = rank;
        this.name = `${suit}${rank}`;
    }

    getName() {
        return this.name;
    }
}

interface Card {
    rank: string;
    suit: string;
    getName(): string;
}

export default Card;