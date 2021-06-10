const express = require("express");
const controller = require("../../controllers/stream.controller");

const router = express.Router();

router
  .route("/")
  /**
   * @api {post} /v1/stream Play Stream
   * @apiDescription Used when user plays new stream
   * @apiVersion 1.0.0
   * @apiName Play Stream
   * @apiGroup Stream
   * @apiPermission public
   *
   * @apiParam  {String}          sessionId     Session ID
   *
   * @apiSuccess (Success 200) {String}  sessionId     Session ID
   * @apiSuccess (Success 200) {Number}  currentStreamsNumber   Current Streams Number
   * @apiSuccess (Success 200) {Boolean}  limitReached  If user will reach the limit (try to play 4th stream) this param will set true.
   *
   * @apiError (Bad Request 400)  ValidationError1  No session ID provided
   * @apiError (Bad Request 400)  ValidationError2  There is no such session ID!
   *
   */
  .post(controller.startStream)
  /**
   * @api {delete} /v1/stream Stop Stream
   * @apiDescription Used when user stops or close a stream
   * @apiVersion 1.0.0
   * @apiName Stop Stream
   * @apiGroup Stream
   * @apiPermission public
   *
   * @apiParam  {String}          sessionId     Session ID
   *
   * @apiSuccess (Success 200) {String}  sessionId     Session ID
   * @apiSuccess (Success 200) {Number}  currentStreamsNumber   Current Streams Number
   *
   * @apiError (Bad Request 400)  ValidationError1  No session ID provided
   * @apiError (Bad Request 400)  ValidationError2  There is no such session ID!
   *
   */
  .delete(controller.stopStream);

module.exports = router;
