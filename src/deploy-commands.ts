import { REST, RouteLike, Routes } from "discord.js";
import { commands } from "./commands";
import { config } from "./config";

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

type DeployCommandsProps = {
  guildId: string;
};

export async function deployCommands({ guildId }: DeployCommandsProps) {
  deployCommandsHelper(Routes.applicationCommands(
    Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId)))
}

export async function deployCommandsGlobally() {
  deployCommandsHelper(Routes.applicationCommands(config.DISCORD_CLIENT_ID))
}

async function deployCommandsHelper(route: RouteLike) {
  try {
    console.log(`Started refreshing application (/) commands. - ${route}`);
    console.log(commandsData)
    await rest.put(
      route,
      {
        body: commandsData,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

export async function removeCommandsHelper({ guildId }: DeployCommandsProps) {
  try {
    await rest.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
      {
        body: [],
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}