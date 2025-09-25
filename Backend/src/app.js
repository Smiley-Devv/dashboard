import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import envs from "./constants/envs.js";
import { initializeBot } from "./bot/bot.js";
import { clerkMiddleware, requireAuth, getAuth, clerkClient } from "@clerk/express";
import router from "./routes/index.js";

const app = express();
const port = envs.PORT || 3000;

// Middleware
app.use(express.static(path.join(process.cwd(), "client")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(clerkMiddleware());

// Mount API routes
app.use("/api", router);

// Clerk Protected Route
app.get("/api/protected", requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const user = await clerkClient.users.getUser(userId);

    return res.json({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Initialize bot and start server
initializeBot()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize bot:", err);
  });
