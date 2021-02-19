const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
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

const next = require('next');
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use( bodyParser.urlencoded({ extended: false }));
  server.use(express.json()); 
  server.use(express.urlencoded({ extended : true})) 

  server.get("/", (req, res) => {
    return app.render(req, res, "/");
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.post("/signup", (req, res) => {
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

  server.post("/login", (req, res) => {
    var id = req.body.Id;
    var pw = req.body.Password;
    console.log(`this is test : ${id}, ${pw}`)

    var sql = `SELECT * FROM DB_308G.ACCOUNT WHERE Id = '${id}'`;
    
    connection.query(sql, (err, rows, fields) => {
      console.log("length : " + rows.length)
      for(var i=0; i<rows.length; i++){
        for(var key in rows[i]){
          console.log("key: " + key +" value : " + rows[i][key]);
        }
      }
      console.log("res...." + res[0]['Id']);
      res.send(rows);
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("listening to 3000");
  });
});