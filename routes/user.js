const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/database");

/*
    GET ALL USER
*/
router.get("/", function (request, response) {
  connection.query("SELECT * FROM user ORDER BY id", function (err, rows) {
    if (err) {
      return response.status(500).json({
        statusbar: false,
        message: "Internal Server Error",
      });
    } else {
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
    body("nama").notEmpty(),
    body("profesi").notEmpty(),
    body("email").notEmpty(),
    body("role_id").notEmpty(),
    body("is_active").notEmpty(),
  ],
  (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(422).json({
        errors: errors.array(),
      });
    }

    let formData = {
      nama: request.body.nama,
      profesi: request.body.profesi,
      email: request.body.email,
      password: request.body.password,
      role_id: request.body.role_id,
      is_active: request.body.is_active,
    };

    connection.query(
      "INSERT INTO user SET ?, tanggal_input = NOW(), modified = NOW()",
      formData,
      function (err, rows) {
        if (err) {
          return response.status(500).json({
            statusbar: false,
            message: "Internal Server Error",
          });
        } else {
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
  let id = request.params.id;

  connection.query(`SELECT * from user WHERE id = ${id}`, function (err, rows) {
    if (err) {
      return response.status(500).json({
        statusbar: false,
        message: "Internal Server Error",
      });
    }
    if (rows.length <= 0) {
      return response.status(404).json({
        statusbar: false,
        message: "Data user not found!",
      });
    } else {
      return response.status(200).json({
        statusbar: true,
        message: "Detail user",
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
    body("nama").notEmpty(),
    body("profesi").notEmpty(),
    body("email").notEmpty(),
    body("role_id").notEmpty(),
    body("is_active").notEmpty(),
  ],
  (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(422).json({
        errors: errors.array(),
      });
    }

    let id = request.params.id;

    let formData = {
      nama: request.body.nama,
      profesi: request.body.profesi,
      email: request.body.email,
      password: request.body.password,
      role_id: request.body.role_id,
      is_active: request.body.is_active,
    };

    connection.query(
      `UPDATE user SET ? WHERE id = ${id}`,
      formData,
      function (err, rows) {
        if (err) {
          return response.status(500).json({
            statusbar: false,
            message: "Internal Server Error",
          });
        } else {
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
  let id = request.params.id;

  connection.query(`DELETE FROM user WHERE id = ${id}`, function (err, rows) {
    if (err) {
      return response.status(500).json({
        statusbar: false,
        message: "Internal Server Error",
      });
    } else {
      return response.status(200).json({
        statusbar: true,
        message: "Success Delete user",
      });
    }
  });
});

module.exports = router;
