import express from 'express';
import { login, registerRoute } from '../Controllers/AuthCont.js';

const router = express.Router();

router.post("/register", registerRoute);
router.post("/login", login);

export default router;