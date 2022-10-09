const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/database");

/*
    GET ALL USER
*/
router.get("/", function (request, response) {
  connection.query("SELECT * FROM role ORDER BY id", function (err, rows) {
    if (err) {
      return response.status(500).json({
        statusbar: false,
        message: "Internal Server Error",
      });
    } else {
      return response.status(200).json({
        statusbar: true,
        message: "List role",
        data: rows,
      });
    }
  });
});

/*
    INSERT USER
*/
router.post("/role", [body("role").notEmpty()], (request, response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(422).json({
      errors: errors.array(),
    });
  }

  let formData = {
    role: request.body.role,
  };

  connection.query("INSERT INTO role SET ?", formData, function (err, rows) {
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
  });
});

/*
  GET USER BY ID
*/
router.get("/(:id)", function (request, response) {
  let id = request.params.id;

  connection.query(`SELECT * from role WHERE id = ${id}`, function (err, rows) {
    if (err) {
      return response.status(500).json({
        statusbar: false,
        message: "Internal Server Error",
      });
    }
    if (rows.length <= 0) {
      return response.status(404).json({
        statusbar: false,
        message: "Data role not found!",
      });
    } else {
      return response.status(200).json({
        statusbar: true,
        message: "Detail role",
        data: rows[0],
      });
    }
  });
});

/* 
    UPDATE USER
*/
router.patch("/update/:id", [body("role").notEmpty()], (request, response) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(422).json({
      errors: errors.array(),
    });
  }

  let id = request.params.id;

  let formData = {
    role: request.body.role,
  };

  connection.query(
    `UPDATE role SET ? WHERE id = ${id}`,
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
          message: "Success Update Data role",
        });
      }
    }
  );
});

/* 
  DELETE USER
*/
router.delete("/delete/(:id)", function (request, response) {
  let id = request.params.id;

  connection.query(`DELETE FROM role WHERE id = ${id}`, function (err, rows) {
    if (err) {
      return response.status(500).json({
        statusbar: false,
        message: "Internal Server Error",
      });
    } else {
      return response.status(200).json({
        statusbar: true,
        message: "Success Delete role",
      });
    }
  });
});

module.exports = router;
