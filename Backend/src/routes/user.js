import { Router } from "express";
import { getUserGuilds } from "../libs/discordAPI.js";
import { clerkClient, getAuth } from "@clerk/express";
import { getBot } from "../bot/bot.js";

const userRouter = Router();

userRouter.get("/guilds", async (req, res) => {
  try {
    const { userId } = getAuth(req);

    // Get user's Discord OAuth access token via Clerk
    const accessToken = (
      await clerkClient.users.getUserOAuthAccessToken(userId, "discord")
    ).data[0].token;

    // Fetch user's guilds
    const userGuilds = (await getUserGuilds(accessToken)).filter(
      (guild) => (guild.permissions & 0x20) === 0x20
    );

    // Bot's guild IDs
    const botGuildIds = new Set(getBot().guilds.cache.keys());

    return res.json({
      withBot: userGuilds.filter((guild) => botGuildIds.has(guild.id)),
      withoutBot: userGuilds.filter((guild) => !botGuildIds.has(guild.id)),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch guilds" });
  }
});

export default userRouter;
