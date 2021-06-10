const uniqid = require("uniqid");
const sessionCache = require("../middleware/sessionCache");

/**
 * Returns a unique session ID
 * @private
 */
function generateSessionId() {
  return uniqid();
}

/**
 * Returns session ID
 * @public
 */
exports.createSession = async (req, res, next) => {
  try {
    const sessionId = generateSessionId();
    sessionCache.setSession(sessionId);
    res.status(200);
    return res.json({ sessionId });
  } catch (error) {
    res.status(500);
    return res.json({ error });
  }
};

/**
 * Returns info about session
 * @public
 */
exports.getSession = async (req, res, next) => {
  try {
    if (!req.body.sessionId) {
      throw new Error("No session ID provided");
    }
    sessionId = req.body.sessionId;
    checkSessionResponse = await sessionCache.checkSession(sessionId);
    if (checkSessionResponse.error) {
      throw new Error("There is no such session ID!");
    }
    res.status(200);
    return res.json(checkSessionResponse);
  } catch (error) {
    res.status(400);
    return res.json(error.message);
  }
};
