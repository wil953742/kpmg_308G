const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const data = fs.readFileSync("database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database,
});

connection.connect();

//Connection Test
connection.query('SELECT * FROM DB_308G.ACCOUNT', (err, results, fields)=>{
    if(err){
        console.log(err);
    }
    console.log(results);
})

//Signup
app.post("/signup", (req, res) => {
    let Id = req.body.Id;
    let Password = req.body.Password;
    let Lastname = req.body.Lastname;
    let Firstname = req.body.Firstname;
    let Birthday = req.body.Birthday;
    let Gender = req.body.Gender;
    let Phone = req.body.Phone;

    let sql =
    "INSERT INTO `DB_308G`.`ACCOUNT` (`Id`, `Password`, `Lastname`, `Firstname`, `Birthday`, `Gender`, `Phone`)\
     VALUES ('?', '?', '?', '?', '?', '?', '?');";
     
     let params = [Id, Password, Lastname, Firstname, Birthday, Gender, Phone];
  
    connection.query(sql, params, (err, rows, fields) => {
      if(err){
        console.log(err);
      }
      else{
        res.send(rows);
      }
    });
  });

  app.get("/api/login/:id&:password", (req, res) => {
    const id = req.params.id;
    const pw = req.params.password;
    connection.query(
      `SELECT * FROM DB_308G.ACCOUNT \
       WHERE Id = "${id}" AND Password="${pw}"`,
      (err, rows, fields) => {
        res.send(rows);
      }
    );
  });
  