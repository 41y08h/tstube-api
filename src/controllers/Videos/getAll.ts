import db from "../../db";
import handler from "../../lib/handler";

const getAll = handler(async (req, res) => {
  const { rows: videos } = await db.query(`select * from "Video"`);
  res.json(videos);
});

export default getAll;
