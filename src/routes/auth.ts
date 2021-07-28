import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import passport from "passport";
import AuthController from "../controllers/Auth";

const auth = Router();

auth.get("/user", authenticate, AuthController.getUser);

auth.get(
  ["/login", "/callback"],
  passport.authenticate("google", { session: false }),
  AuthController.completeOAuth
);

export default auth;
