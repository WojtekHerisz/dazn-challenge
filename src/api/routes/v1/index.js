const express = require("express");
const session = require("./session.route");
const stream = require("./stream.route");

const router = express.Router();

/**
 * @api {get} /v1/status Service Status
 * @apiDescription Checks service status
 * @apiVersion 1.0.0
 * @apiName Service Status
 * @apiGroup Service
 * @apiPermission public
 *
 */

router.get("/status", (req, res) => res.send("Alive"));

/**
 * GET v1/docs
 */
router.use("/doc", express.static("doc"));

/**
 * GET v1/session router
 */

router.use("/session", session);
router.use("/stream", stream);

module.exports = router;
