import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { formatHeathUrl } from "../utils";

export const data = new SlashCommandBuilder()
    .setName("random-heathcliff")
    .setDescription("Posts a Random Heathcliff");

export async function execute(interaction: CommandInteraction) {
    var dd = String(Math.floor(Math.random() * 28) + 1);
    var mm = String(Math.floor(Math.random() * 12) + 1);
    var yyyy = String(Math.floor(Math.random() * 14) + 2009);

    try {
        interaction.reply(formatHeathUrl(dd, mm, yyyy));
    }
    catch (err) {
        console.log(err)
        console.log("Well that's not supposed to happen");
        return;
    }
    return;
}
