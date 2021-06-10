const express = require("express");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("Alive"));

module.exports = router;
