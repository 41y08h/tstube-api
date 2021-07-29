import db from "../../db";
import handler from "../../lib/handler";

const getOne = handler(async (req, res) => {
  const videoId = req.params.id;
  const {
    rows: [video],
  } = await db.query(`select * from "Video" where id = $1`, [videoId]);

  res.json(video);
});

export default getOne;
