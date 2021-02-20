import { NextApiHandler } from "next";
import { query } from "../../lib/db";

const handler: NextApiHandler = async (req, res) => {
  const user = JSON.parse(req.body.user);

  const id = user.id;
  const password = user.password;
  const username = user.username;
  const birthday = user.birthday;
  const gender = user.gender;
  const phone = user.phone;
  const height = user.height;
  const weight = user.weight;
  const upper = user.upper;
  const shoulder = user.shoulder;
  const arm = user.arm;
  const waist = user.waist;
  const leg = user.leg;
  const chest = user.chest;
  const tummy = user.tummy;
  
  try {
    await query(
    `INSERT INTO DB_308G.ACCOUNT ('Id', 'Password', 'Username', 'Firstname', 'Birthday', 'Gender', 'Phone')\
     VALUES ('${id}', '${password}', '${username}', null, '${birthday}', '${gender}', '${phone}');`
    );

    await query(
    `INSERT INTO DB_308G.ACCOUNT ('Bodykey', 'Id', 'Checkday', 'Height', 'Weight', 'Upper', 'Shoulder', 'Arm', 'Waist', 'Leg')\
     VALUES (null, '${id}', null, '${height}', '${weight}', '${upper}', '${shoulder}', '${arm}', '${waist}', '${leg}');`
    );

    await query(
    `INSERT INTO 'DB_308G'.'MAN' ('Bodykey', 'Id', 'Chest', 'Tummy')\
    VALUES (null, '${id}', '${chest}', '${tummy}');`
    );

    await query(
      `INSERT INTO 'DB_308G'.'WOMAN' ('Bodykey', 'Id', 'Bra_size', 'Bra_cup', 'Hip', 'Tummy')\
      VALUES (null, '${id}', '${lastname}', '${firstname}');`
      );

    await query(
      `INSERT INTO 'DB_308G'.'PREFERENCE' ('Preferencekey', 'Id', 'Fit', 'Brand', 'Vibe', 'Type', 'Esg')\
      VALUES (null, '${password}', '${lastname}', '${firstname}', '${firstname}', '${firstname}', '${firstname}');`
      );

    return null;
  } catch (e) {
    res.status(500).json({ message: e.message });
  }

  return null;
};

export default handler;