const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/database");

/*
    GET ALL USER
*/
router.get("/", function (request, response) {
  // query untuk mendapatkan semua data dari database
  connection.query("SELECT * FROM user ORDER BY id", function (err, rows) {
    // membuat sebuah kondisi
    // untuk memastikan apakah proses dari query tersebut berhasil atau tidak.
    if (err) {
      // Jika dari query di atas terdaapat kesalahan,
      // maka kita akan mengembalikan sebuah response JSON dengan status code 500
      return response.status(500).json({
        statusbar: false,
        message: "Internal Server Error",
      });
    } else {
      // jika dari proses query di atas berhasi,
      // maka kita akan melakukan return ke dalam format JSON dengan status code 200,
      // dan kita ambil data dari hasil query tersebut.
      return response.status(200).json({
        statusbar: true,
        message: "List User",
        data: rows,
      });
    }
  });
});

/*
    INSERT USER
*/
router.post(
  "/",
  [
    // Validasi digunakan untuk melakukan pengecekan request
    // dengan memberikan aturan tidak boleh dikosongkan.
    body("nama").notEmpty(),
    body("profesi").notEmpty(),
    body("email").notEmpty(),
    body("role_id").notEmpty(),
    body("is_active").notEmpty(),
  ],
  (request, response) => {
    const errors = validationResult(request);

    // Jika request tersebut bernilai tidak terpenuhi,
    // maka kita akan melakukan return dengan format JSON yang
    // berisi informasi validasi di atas.
    if (!errors.isEmpty()) {
      return response.status(422).json({
        errors: errors.array(),
      });
    }

    // Tapi, jika request tersebut terpenuhi,
    // maka kita akan membuat variable dengan nama formData dengan jenis array
    // yang isinya adalah request tersebut.
    let formData = {
      nama: request.body.nama,
      profesi: request.body.profesi,
      email: request.body.email,
      password: request.body.password,
      role_id: request.body.role_id,
      is_active: request.body.is_active,
    };

    // Kemudian setelah data berhasil di tampung di dalam variable formData,
    // sekarang kita lakukan insert ke dalam database menggunakan query.
    connection.query(
      "INSERT INTO user SET ?, tanggal_input = NOW(), modified = NOW()",
      formData,
      function (err, rows) {
        // Di dalam query di atas, kita melakukan sebuah pengecekan kondisi,
        // jika query gagal dilakukan,
        // maka kita akan melakukan return ke dalam format JSON dengan status code 500.
        if (err) {
          return response.status(500).json({
            statusbar: false,
            message: "Internal Server Error",
          });
        } else {
          // Tapi, jika proses insert data berhasil dilakukan,
          // maka kita akan melakukan return dengan format JSON dan status code 201.
          return response.status(201).json({
            statusbar: true,
            message: "Success Insert Data",
            data: rows[0],
          });
        }
      }
    );
  }
);

/*
  GET USER BY ID
*/
router.get("/(:id)", function (request, response) {
  // membuat variable baru dengan nama id,
  // dan isinya kita ambil dari parameter yang bernama id.
  let id = request.params.id;

  // melakukan query ke dalam database dengan parameter ID yang didapatkan dari URL browser
  connection.query(`SELECT * from user WHERE id = ${id}`, function (err, rows) {
    if (err) {
      // Jika di dalam proses query ada kesalahan,
      // maka kita akan melakukan return ke dalam format JSON
      // dengan status code 500 dan menampilkan pesan Internal Server Error
      return response.status(500).json({
        statusbar: false,
        message: "Internal Server Error",
      });
    }
    if (rows.length <= 0) {
      // jika dari proses query di atas berhasil dilakukan,
      // tetapi tidak mendapatkan data yang sesuai dengan parameter yang di cari,
      // maka kita akan melakukan return dengan status code 404
      // dan menampilkan pesan Data User Not Found!
      return response.status(404).json({
        statusbar: false,
        message: "Data User Not Found!",
      });
    } else {
      // jika query berhasil dijalankan dan mendapatkan hasil data sesuai dengan parameter ID,
      // maka kita akan melakukan return ke dalam format JSON dengan status code 200 dan
      // menampilkan detail data tersebut
      return response.status(200).json({
        statusbar: true,
        message: "Detail User",
        data: rows[0],
      });
    }
  });
});

/* 
    UPDATE USER
*/
router.patch(
  "/:id",
  [
    // membuat definisi validasi terlebih dahulu
    // untuk memastikan data yang dikirimkan tidak kosong.
    body("nama").notEmpty(),
    body("profesi").notEmpty(),
    body("email").notEmpty(),
    body("role_id").notEmpty(),
    body("is_active").notEmpty(),
  ],
  (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      // Jika validasi di atas tidak terpenuhi,
      // maka kita akan melakukan return menggunakan format JSON
      // dengan status code 422 dan menampilkan detail error validasinya.
      return response.status(422).json({
        errors: errors.array(),
      });
    }

    // Jika validasi terpenuhi, pertama kita akan membuat variable baru dengan nama id,
    // yang isinya diambil dari parameter yang bernama id.
    // Variable ini nantinya akan digunakan sebagai parameter untuk proses update di dalam query database.
    let id = request.params.id;

    // membuat variable baru lagi dengan nama formData yang memiliki jenis array,
    // yang mana isinya adalah key.
    // Dan kedua key tersebut mengambil data dari request yang dikirimkan.
    let formData = {
      nama: request.body.nama,
      profesi: request.body.profesi,
      email: request.body.email,
      password: request.body.password,
      role_id: request.body.role_id,
      is_active: request.body.is_active,
    };

    // melakukan query update ke dalam database berdasarkan id
    connection.query(
      `UPDATE user SET ? WHERE id = ${id}`,
      formData,
      function (err, rows) {
        if (err) {
          // membuat sebuah kondisi untuk pengecekan apakah prosesnya berhasil atau tidak.
          // Jika query mengalami kesalahan,
          // maka akan melakukan return ke dalam format JSON dengan status code 500
          // dan menampilkan pesan Internal Server Error.
          return response.status(500).json({
            statusbar: false,
            message: "Internal Server Error",
          });
        } else {
          // jika proses update data berhasil dilakukan,
          // maka akan melakukan return dengan format JSON
          // dan status code 200 dan menampilkan pesan Update Data Successfully.
          return response.status(200).json({
            statusbar: true,
            message: "Success Update Data user",
          });
        }
      }
    );
  }
);

/* 
  DELETE USER
*/
router.delete("/(:id)", function (request, response) {
  // membuat variable baru dengan nama id,
  // yang isinya megambil dari request parameter yang bernama id.
  let id = request.params.id;

  // melakukan query untuk proses delete data
  // ke dalam database berdasarkan ID yang didapatkan dari parameter di atas.
  connection.query(`DELETE FROM user WHERE id = ${id}`, function (err, rows) {
    if (err) {
      // membuat sebuah kondisi untuk memeriksa
      // apakah proses delete data tersebut berhasil atau tidak.
      // Jika query yang dijalankan tidak sesuai,
      // maka akan melakukan return denga status code 500
      // dan menampilkan pesan Internal Server Error.
      return response.status(500).json({
        statusbar: false,
        message: "Internal Server Error",
      });
    } else {
      // jika proses query berhasil dijalankan,
      // maka kita akan melakukan return ke dalam format JSON dengan status code 200
      // dan menampilkan pesan Delete Data Successfully.
      return response.status(200).json({
        statusbar: true,
        message: "Success Delete user",
      });
    }
  });
});

module.exports = router;
