import express from "express";
import { handleUserSignup } from "../controllers/signup.js";

const router = express.Router();

router.post('/user', handleUserSignup);

export default router;