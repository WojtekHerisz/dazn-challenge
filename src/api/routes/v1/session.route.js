const express = require("express");
const controller = require("../../controllers/session.controller");

const router = express.Router();

router.route("/").post(controller.createSession);

module.exports = router;
