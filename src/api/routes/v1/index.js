const express = require("express");
const session = require("./session.route");
const stream = require("./stream.route");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("Alive"));

/**
 * GET v1/session router
 */

router.use("/session", session);
router.use("/stream", stream);

module.exports = router;
