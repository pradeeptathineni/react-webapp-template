const axios = require("axios");
const express = require("express");
const router = express.Router();
const { hibpApiKey } = require("../config");

router.get("/", function (req, res) {
  try {
    res.send({
      result: require("../public/colors.json"),
      response: "success",
    });
  } catch (error) {
    if (error.message) {
      res.send({ error: error.message, response: "failure" });
    } else {
      res.send({ error, response: "failure" });
    }
  }
});

router.get("/level2route", function (req, res) {
  try {
    axios({
      method: "GET",
      url: "http://localhost:3010/example",
    })
      .then((result) => {
        res.send({ result: result.data, response: "success" });
      })
      .catch((error) => {
        res.send({ result: [], response: "success" });
      });
  } catch (error) {
    if (error.message) {
      res.send({ error: error.message, response: "failure" });
    } else {
      res.send({ error, response: "failure" });
    }
  }
});

router.get("/level2route/:slug", function (req, res) {
  try {
    const param = req.params.slug;
    axios({
      method: "GET",
      url: "http://localhost:3010/example",
    })
      .then((result) => {
        res.send({ result: { ...result.data, param }, response: "success" });
      })
      .catch((error) => {
        res.send({ result: [], response: "success" });
      });
  } catch (error) {
    if (error.message) {
      res.send({ error: error.message, response: "failure" });
    } else {
      res.send({ error, response: "failure" });
    }
  }
});

module.exports = router;
