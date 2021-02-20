import { NextApiHandler } from "next";
import { query } from "../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const { password } = req.query;
  const { lastname } = req.body.Id;
  const { firstname } = req.body.Password;
  const { birthday } = req.body.Lastname;
  const { gender } = req.body.Birthday;
  const { phone } = req.body.Gender;
  
  try {
    const results = await query(
    `INSERT INTO 'DB_308G'.'ACCOUNT' ('Id', 'Password', 'Lastname', 'Firstname', 'Birthday', 'Gender', 'Phone')\
     VALUES ('${id}', '${password}', '${lastname}', '${firstname}', '${birthday}', '${gender}', '${phone}');`
    );

    return res.json(results[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;