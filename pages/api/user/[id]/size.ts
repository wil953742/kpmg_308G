import { NextApiHandler } from "next";
import { query } from "../../../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  const id = req.query.id;
  try {
    const results = await query(
      `
      SELECT UPPER, SHOULDER, ARM, WAIST, LEG, HEIGHT, WEIGHT
      FROM BODY, ACCOUNT
      WHERE ACCOUNT.ID='${id}' AND ACCOUNT.ID = BODY.ID
    `
    );
    return res.json(results[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
