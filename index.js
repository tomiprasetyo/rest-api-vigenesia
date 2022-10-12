const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const motivasiRouter = require("./routes/motivasi");
const roleRouter = require("./routes/role");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/*
  CORS merupakan singkatan dari Cross Origin Resource Sharing, 
  yaitu sebuah teknik menggunakan permintaan HTTP untuk mengizinkan browser 
  pada suatu domain mendapatkan akses ke server pada sumber yang berbeda. 
  Ini digunakan agar Retful API yang sudah kita buat sebelumnya bisa digunakan 
  atau bisa di akses oleh aplikasi lain seperti aplikasi Android atau web browser.
*/
app.use(cors());

// kita gunakan keyword use
// untuk melakukan assign konfigurasi router tersebut ke dalam main file
app.use("/api/vigenesia/user", userRouter);
app.use("/api/vigenesia/motivasi", motivasiRouter);
app.use("/api/vigenesia/role", roleRouter);

app.listen(port, () => {
  console.log(`app is runnning at port ${port}`);
});
