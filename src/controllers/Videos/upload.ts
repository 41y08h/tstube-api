import handler from "../../lib/handler";
import { UploadedFile } from "express-fileupload";
import IUser from "../../interfaces/IUser";
import VideosService from "../../services/Videos";

const upload = handler(async (req, res) => {
  if (!req.files) return res.error("A file is required.");

  const file = req.files?.file as UploadedFile;

  if (file.mimetype !== "video/mp4")
    return res.error("Only mp4 videos are supported currently.");
  if (file.size > 5e7) return res.error("File size must not exceed 50MB");

  // Validate form data
  if (!req.body.title) return res.error("Title is required");
  if (!req.body.description) return res.error("Description is required");

  const currentUser = req.currentUser as IUser;

  const video = await VideosService.upload({
    file,
    body: req.body,
    userId: currentUser.id,
  });

  res.json(video);
});

export default upload;
