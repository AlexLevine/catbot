import { Client } from "discord.js";
import { commands } from "./commands";
import { config } from "./config";
import { createJobScheduler } from "./cron-scheduler";
import { deployCommands, deployCommandsGlobally } from "./deploy-commands";
import { fixTwitterUrls, parseTwitterUrls } from "./utils";

const DRAIN_GANG_GUILD = '721491751440875520'
const TEST_GUILD = '707437104275128362'

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages", "MessageContent"],
});

client.once("ready", async () => {
  await deployCommandsGlobally()
  console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

client.on("messageCreate", message => {
  const foundTwitterUrls = parseTwitterUrls(message.content)

  if (foundTwitterUrls.length) {
    const fixedTwitterUrls = fixTwitterUrls(foundTwitterUrls)
    message.channel.send(fixedTwitterUrls.join(' , '))
  }
})

const cronSchedule = createJobScheduler(client)
client.login(config.DISCORD_TOKEN)
