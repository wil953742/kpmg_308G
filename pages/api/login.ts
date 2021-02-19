import { NextApiHandler } from "next";
import { query } from "../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const { password } = req.query;
  try {
    if (!id) {
      return res.status(400).json({ message: "`id` required" });
    }
    const results = await query(
      `
      SELECT *
      FROM ACCOUNT
      WHERE id = "${id}" AND password = "${password}"
    `
    );
    return res.json(results[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
