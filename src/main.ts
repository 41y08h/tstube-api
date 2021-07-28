import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes";
import AuthService from "./services/Auth";
import cookieParser from "cookie-parser";
import passport from "passport";
import createDebug from "debug";

async function main() {
  const app = express();
  const debug = createDebug("app");

  AuthService.configure();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(passport.initialize());

  app.use(routes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => debug(`started on port ${PORT}`));
}

main();
