import { NextApiHandler } from "next";
import { query } from "../../lib/db";
import { useRouter } from "next/router";

const handler: NextApiHandler = async (req, res) => {
  const user = JSON.parse(req.body.user);

  const id = user.id;
  const password = user.password;
  const username = user.username;
  const birthday = user.birthday;
  const gender = user.gender;
  const phone = user.phone;
  const email = user.email;
  const height = user.height;
  const weight = user.weight;
  const upper = user.upper;
  const shoulder = user.shoulder;
  const arm = user.arm;
  const waist = user.waist;
  const leg = user.leg;
  const chest = user.chest;
  const tummy = user.tummy;
  const bra_size = user.bra_size;
  const bra_cup = user.bra_cup;
  const hip = user.hip;
  const fit = user.fit;
  const brand = user.brand;
  const vibe = user.vibe;
  const type = user.type;
  const esg = user.esg;
  
  try {
    
    await query(
    `INSERT INTO DB_308G.ACCOUNT (Id, Password, Username, Firstname, Birthday, Gender, Phone, Email)\
     VALUES ('${id}', '${password}', '${username}', '${username}', '${birthday}', '${gender}', '${phone}', '${email}');`
    );
      
    await query(
    `INSERT INTO DB_308G.BODY (Bodykey, Id, Checkday, Height, Weight, Upper, Shoulder, Arm, Waist, Leg)\
     VALUES (null, '${id}', null, ${height}, ${weight}, ${upper}, ${shoulder}, ${arm}, '${waist}', ${leg});`
    );

    const result = await query(
      `INSERT INTO DB_308G.PREFERENCE (Preferencekey, Id, Fit, Brand, Vibe, Type, Esg)\
      VALUES (null, '${id}', '${fit}', '${brand}', '${vibe}', '${type}', '${esg}');`
    ); 

    if(gender == '남자'){
      await query(
        `INSERT INTO DB_308G.MAN (Id, Chest, Tummy)\
        VALUES ('${id}', '${chest}', '${tummy}');`
        );
    } 
    else {
      await query(
        `INSERT INTO DB_308G.WOMAN (Id, Bra_size, Bra_cup, Hip, Tummy)\
        VALUES ('${id}', ${bra_size}, '${bra_cup}', '${hip}', '${tummy}');`
        );
    }

    return res.json(result[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default handler;
