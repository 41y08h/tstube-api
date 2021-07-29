import { Router } from "express";
import authenticate from "../middlewares/authenticate";
import VideosController from "../controllers/Videos";

const videos = Router();

videos.post("/", authenticate, VideosController.upload);

export default videos;
