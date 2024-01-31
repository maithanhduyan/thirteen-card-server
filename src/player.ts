class Player {

    password: string;
    constructor(public id: string, public name: string, public username: string) {
        this.id = id;
        this.username = username;
        this.name = name;
    }

    authenticate(username: string, password: string) {
        return false;
    }

}

export default Player;