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
    await query(
    `INSERT INTO 'DB_308G'.'ACCOUNT' ('Id', 'Password', 'Lastname', 'Firstname', 'Birthday', 'Gender', 'Phone')\
     VALUES ('${id}', '${password}', '${lastname}', '${firstname}', '${birthday}', '${gender}', '${phone}');`
    );

    await query(
    `INSERT INTO 'DB_308G'.'BODY' ('Bodykey', 'Id', 'Checkday', 'Height', 'Weight', 'Upper', 'Shoulder', 'Arm', 'Waist', 'Leg')\
     VALUES (null, '${password}', '${lastname}', '${firstname}', '${birthday}', '${gender}', '${phone}', '${phone}', '${phone}', '${phone}');`
    );

    await query(
    `INSERT INTO 'DB_308G'.'MAN' ('Bodykey', 'Id', 'Chest', 'Tummy')\
    VALUES (null, '${password}', '${lastname}', '${firstname}');`
    );

    await query(
      `INSERT INTO 'DB_308G'.'WOMAN' ('Bodykey', 'Id', 'Bra_size', 'Bra_cup', 'Hip', 'Tummy')\
      VALUES (null, '${password}', '${lastname}', '${firstname}');`
      );

    await query(
      `INSERT INTO 'DB_308G'.'PREFERENCE' ('Preferencekey', 'Id', 'Fit', 'Brand', 'Vibe', 'Type', 'Esg')\
      VALUES (null, '${password}', '${lastname}', '${firstname}', '${firstname}', '${firstname}', '${firstname}');`
      );

    return null;
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;