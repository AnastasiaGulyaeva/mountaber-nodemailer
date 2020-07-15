"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mountaber.com",
  port: 25,
  secure: false,
  auth: {
    user: "hello@mountaber.com", // Cambialo por tu email
    pass: "2020PerpetualFineJewelry&&$$", // Cambialo por tu password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/send", function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let message = req.body.message;

  let mailOptions = {
    from: email,
    to: "hello@mountaber.com", // Enter here the email address on which you want to send emails from your customers
    subject: "Contacto desde mountaber.com",
    html:
      "<strong>Nombre: </strong>" +
      name +
      " <br/ > <strong>Móvil: </strong>" +
      phone +
      "<br/> <strong>Mensaje: </strong>" +
      message,
  };

  if (name === "") {
    res.status(400);
    res.send({
      message: "name Bad request",
    });
    return;
  }

  if (email === "") {
    res.status(400);
    res.send({
      message: "email Bad request",
    });
    return;
  }

  if (phone === "") {
    res.status(400);
    res.send({
      message: " phone Bad request",
    });
    return;
  }

  if (message === "") {
    res.status(400);
    res.send({
      message: "message Bad request",
    });
    return;
  }

  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end("ERROR!", error);
    } else {
      console.log("Message sent: ", response);
      res.end("sent");
    }
  });
});

app.listen(port, function () {
  console.log("Express started on port: ", port);
});
