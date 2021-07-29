import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes";
import AuthService from "./services/Auth";
import cookieParser from "cookie-parser";
import passport from "passport";
import createDebug from "debug";
import parseUser from "./middlewares/parseUser";
import fileUpload from "express-fileupload";
import errors from "./middlewares/errors";
import morgan from "morgan";
import path from "path";

async function main() {
  const app = express();
  const debug = createDebug("app");

  AuthService.configure();

  if (process.env.NODE_ENV === "development") {
    app.use("/localstore", express.static(path.join(__dirname, "localstore")));
    app.use(morgan("dev"));
  }
  app.use(express.json());
  app.use(fileUpload());
  app.use(cors());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(parseUser);
  app.use(errors);

  app.use(routes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => debug(`started on port ${PORT}`));
}

main();
