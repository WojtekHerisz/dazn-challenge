const sessionCache = require("../middleware/sessionCache");

/**
 * Returns session ID and increased stream number
 * @public
 */
exports.startStream = async (req, res, next) => {
  try {
    if (!req.body.sessionId) {
      throw new Error("No session ID provided");
    }
    sessionId = req.body.sessionId;
    checkSessionResponse = await sessionCache.checkSession(sessionId);
    if (checkSessionResponse.error) {
      throw new Error("There is no such session ID!");
    }
    sessionId = req.body.sessionId;
    playStreamResponse = sessionCache.addStreamToSession(sessionId);
    console.log("resp", playStreamResponse);
    res.status(200);
    return res.json(playStreamResponse);
  } catch (error) {
    res.status(400);
    return res.send(error.message);
  }
};

/**
 * Returns session ID and decreased stream number
 * @public
 */
exports.stopStream = async (req, res, next) => {
  try {
    if (!req.body.sessionId) {
      throw new Error("No session ID provided");
    }
    sessionId = req.body.sessionId;
    checkSessionResponse = await sessionCache.checkSession(sessionId);
    if (checkSessionResponse.error) {
      throw new Error("There is no such session ID!");
    }
    sessionId = req.body.sessionId;
    stopStreamResponse = sessionCache.removeStreamFromSession(sessionId);
    console.log("resp", stopStreamResponse);
    res.status(200);
    return res.json(stopStreamResponse);
  } catch (error) {
    res.status(500);
    return res.send(error.message);
  }
};
