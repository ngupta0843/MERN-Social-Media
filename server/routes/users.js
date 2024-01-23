import express from "express";
import {
  singin,
  signup
} from "../controllers/user.js";

const router = express.Router();

router.post('/signin', singin);
router.post('/signup', signup);


export default router;

