import { Router } from "express";
import userRouter from "./user.js";

const router = Router();

// Mount user router at /user
router.use("/user", userRouter);

export default router;
