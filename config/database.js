const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "r3tr0c00l159",
  database: "db_api_vigenesia",
});

connection.connect(function (error) {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Success connect to database");
  }
});

module.exports = connection;
