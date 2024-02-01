import Player from "../player.ts";

const kv = await Deno.openKv();

export async function addPlayer(player: Player) {
    await kv.set(["players", player.id], player);
}

export async function findPlayerbyId(id: string): Promise<Player> {
    const key = ["players", id];
    return (await kv.get(key)).value as Player;
}

export async function deletePlayer(id: string) {
    return await kv.delete(["players", id]);
}