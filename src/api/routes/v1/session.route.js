const express = require("express");
const controller = require("../../controllers/session.controller");

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /v1/session Create Session
   * @apiDescription Creates new session
   * @apiVersion 1.0.0
   * @apiName Create Session
   * @apiGroup Session
   * @apiPermission public
   *
   * @apiSuccess (Success 200) {String}  sessionId     Created Session ID
   *
   */
  .post(controller.createSession)
  /**
   * @api {get} /v1/session Get Session
   * @apiDescription Gets info about session
   * @apiVersion 1.0.0
   * @apiName Get Session
   * @apiGroup Session
   * @apiPermission public
   *
   * @apiParam  {String}          sessionId     Session ID
   *
   * @apiSuccess (Success 200) {String}  sessionId     Created Session ID
   * @apiSuccess (Success 200) {Number}  currentStreamsNumber   Current Streams Number
   *
   * @apiError (Bad Request 400)  ValidationError1  No session ID provided
   * @apiError (Bad Request 400)  ValidationError2  There is no such session ID!
   *
   */
  .get(controller.getSession);

module.exports = router;
