import Player from "./player";


export class PublicRoom {

    name!: string;
    player: Player;
    constructor() { }

    setName(name: string) {
        this.name = name;
    }
}

export class GameRoom {
    id: number | undefined;
    players!: Player[];

    constructor() { }

    joinGame(player: Player) {
        this.players.push(player);
    }

    leaveGame(player: Player) {
        // Find the index of the player to be removed
        const index = this.players.findIndex(p => p.id === player.id);

        // If the player is found, remove them from the array
        if (index !== -1) {
            this.players.splice(index, 1);
        }
    }
}