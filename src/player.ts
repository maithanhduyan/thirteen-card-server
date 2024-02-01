/**
 * 
*/
import { generateRandomString } from "./utils.ts";

export default class Player {

    password!: string;
    constructor(public id: string, public name: string, public username: string) {
        this.id = id;
        this.username = username;
        this.name = name;
    }

    authenticate(username: string, password: string) {
        return false;
    }

    createPlayer(player: Player) {
        this.id = generateRandomString(12);
        this.name = player.name;
        this.password = generateRandomString(6);
    }

}