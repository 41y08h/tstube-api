import ffmpeg, { FfprobeStream } from "fluent-ffmpeg";

export default function getMetaData(filePath: string): Promise<FfprobeStream> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, data) => {
      if (err) return reject(err);
      resolve(data.streams[0]);
    });
  });
}
