const express = require("express");
const controller = require("../../controllers/stream.controller");

const router = express.Router();

router.route("/").post(controller.startStream).delete(controller.stopStream);

module.exports = router;
