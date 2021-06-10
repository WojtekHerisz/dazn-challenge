const express = require("express");
const controller = require("../../controllers/session.controller");

const router = express.Router();

router.route("/").post(controller.createSession).get(controller.getSession);

module.exports = router;
