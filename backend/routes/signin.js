import express from "express";
import { handleUserLogin } from "../controllers/signin.js";

const router = express.Router();

router.post('/user', handleUserLogin);

export default router;