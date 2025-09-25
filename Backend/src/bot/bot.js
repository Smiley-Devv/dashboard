import { Client, GatewayIntentBits, Partials } from "discord.js";
import envs from "../constants/envs.js";

let bot;

export const initializeBot = () => {
  bot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildModeration,
      GatewayIntentBits.DirectMessages,
    ],
    partials: [
      Partials.Channel,
      Partials.Message,
      Partials.User,
      Partials.GuildMember,
      Partials.Reaction,
    ],
  });

  bot.once("ready", () => {
    console.log(`Logged in as ${bot.user.tag}`);
  });

  return bot.login(envs.DISCORD_BOT_TOKEN).then(() => bot);
};

export const getBot = () => {
  if (!bot) throw new Error("Bot not initialized yet");
  return bot;
};
