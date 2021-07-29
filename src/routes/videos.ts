import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import VideosController from "../controllers/Videos";

const videos = Router();

videos.get("/", VideosController.getAll);
videos.get("/:id", VideosController.getOne);
videos.post("/", authenticate, VideosController.upload);

export default videos;
