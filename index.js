const express = require("express");
const morgan = require("morgan");
const path = require("path");
const mssql = require("mssql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const { signedCookie } = require("cookie-parser");
const session = require("express-session");
dotenv.config({ path: "./.env" });
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 8080;

var config = {
  server: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
};

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//HTTP request logger
app.use(morgan("tiny"));




console.log(__dirname);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, 'client/build')));
}


mssql.connect(config, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("MsSQL Connected..."); // log to confirm it connected to database
  }
});
/*
 var jsonString = {
  'vehicleID': '3421',
  'type': 'StorMaskine',
  'powerBILink': 'Power.comme',
  'personID': '1',
  'timeSinceMotService': '211'
}*/
/*
app.get("/fleet", function (req, res) {
  console.log('getting fleet');
  res.json(jsonString);
});*/

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(PORT, console.log(`server is starting at ${PORT}`));
