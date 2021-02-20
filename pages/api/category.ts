import { NextApiHandler } from "next";
import { query } from "../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = await query(
      `
          SELECT CATEGORY.VALUES
          FROM CATEGORY
          WHERE NAME='${name}'
      `
    );
    return res.json(results[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
