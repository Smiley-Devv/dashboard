import axios from "axios";

const DISCORD_API = "https://discord.com/api/v10";

export const getUserGuilds = async (accessToken) => {
  try {
    const res = await axios.get(`${DISCORD_API}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch guilds:", err);
    throw err;
  }
};
