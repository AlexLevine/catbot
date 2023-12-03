import { Client } from "discord.js";
import { commands } from "./commands";
import { config } from "./config";
import { createJobScheduler } from "./cron-scheduler";
import { deployCommands } from "./deploy-commands";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", async () => {
  // await deployCommands({guildId: '707437104275128362'})

  console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {

  console.log(interaction)
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

const cronSchedule = createJobScheduler(client)
client.login(config.DISCORD_TOKEN)
