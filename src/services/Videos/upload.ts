import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import path from "path";
import getMetaData from "./getMetaData";
import generateThumbnail from "./generateThumbnail";
import fs from "fs";
import uploadToCloud from "../../lib/uploadToCloud";
import db from "../../db";

export default async function upload({
  file,
  body,
  userId,
}: {
  file: UploadedFile;
  body: {
    title: string;
    description: string;
  };
  userId: number;
}) {
  const fileId = uuid();
  const videoFilename = `${fileId}.mp4`;
  const thumbnailFilename = `${fileId}.png`;

  const tempPath = path.join(__dirname, "../../temp");
  const videoPath = path.join(tempPath, videoFilename);
  const thumbnailPath = path.join(tempPath, thumbnailFilename);

  await file.mv(videoPath);

  const metadata = await getMetaData(videoPath);
  await generateThumbnail(videoPath, thumbnailFilename, tempPath);

  const videoBase64 = file.data.toString("base64");
  const thumbnailBase64 = fs.readFileSync(thumbnailPath, {
    encoding: "base64",
  });

  // Upload files
  const videoURL = await uploadToCloud(videoBase64, videoFilename);
  const thumbnailURL = await uploadToCloud(thumbnailBase64, thumbnailFilename);

  const { title, description } = body;

  const {
    rows: [video],
  } = await db.query(
    `insert into "Video" (title, description, src, thumbnail, duration, "userId")
      values ($1, $2, $3, $4, $5, $6) returning *`,
    [
      title,
      description,
      videoURL,
      thumbnailURL,
      parseInt(metadata.duration as string),
      userId,
    ]
  );

  // Cleanup temp files on disk
  try {
    fs.unlinkSync(videoPath);
    fs.unlinkSync(thumbnailPath);
  } catch (err) {
    console.log(err);
  }

  return video;
}
