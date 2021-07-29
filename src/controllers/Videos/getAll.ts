import db from "../../db";
import handler from "../../lib/handler";

const getAll = handler(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;

  const { rows: videos } = await db.query(
    `
    select * from "Video" 
    order by "createdAt" desc
    offset ($1 - 1) * 24
    limit 24
    `,
    [page]
  );

  const {
    rows: [{ total }],
  } = await db.query(
    `select cast(count("Video") as int) as total from "Video"`
  );

  res.json({
    page,
    hasMore: page * 24 < total,
    items: videos,
  });
});

export default getAll;
