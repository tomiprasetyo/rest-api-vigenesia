const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/database");

/*
    GET ALL USER
*/
router.get("/", function (request, response) {
  connection.query("SELECT * FROM motivasi ORDER BY id", function (err, rows) {
    if (err) {
      return response.status(500).json({
        statusbar: false,
        message: "Internal Server Error",
      });
    } else {
      return response.status(200).json({
        statusbar: true,
        message: "List Motivasi",
        data: rows,
      });
    }
  });
});

/*
    INSERT USER
*/
router.post(
  "/motivasi",
  [body("isi_motivasi").notEmpty(), body("id_user").notEmpty()],
  (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(422).json({
        errors: errors.array(),
      });
    }

    let formData = {
      isi_motivasi: request.body.isi_motivasi,
      id_user: request.body.id_user,
    };

    connection.query(
      "INSERT INTO motivasi SET ?, tanggal_input = NOW(), tanggal_update = NOW()",
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

  connection.query(
    `SELECT * from motivasi WHERE id = ${id}`,
    function (err, rows) {
      if (err) {
        return response.status(500).json({
          statusbar: false,
          message: "Internal Server Error",
        });
      }
      if (rows.length <= 0) {
        return response.status(404).json({
          statusbar: false,
          message: "Data motivasi not found!",
        });
      } else {
        return response.status(200).json({
          statusbar: true,
          message: "Detail motivasi",
          data: rows[0],
        });
      }
    }
  );
});

/* 
    UPDATE USER
*/
router.patch(
  "/update/:id",
  [body("isi_motivasi").notEmpty(), body("id_user").notEmpty()],
  (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(422).json({
        errors: errors.array(),
      });
    }

    let id = request.params.id;

    let formData = {
      isi_motivasi: request.body.isi_motivasi,
      id_user: request.body.id_user,
    };

    connection.query(
      `UPDATE motivasi SET ? WHERE id = ${id}`,
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
            message: "Success Update Data motivasi",
          });
        }
      }
    );
  }
);

/* 
  DELETE USER
*/
router.delete("/delete/(:id)", function (request, response) {
  let id = request.params.id;

  connection.query(
    `DELETE FROM motivasi WHERE id = ${id}`,
    function (err, rows) {
      if (err) {
        return response.status(500).json({
          statusbar: false,
          message: "Internal Server Error",
        });
      } else {
        return response.status(200).json({
          statusbar: true,
          message: "Success Delete motivasi",
        });
      }
    }
  );
});

module.exports = router;
