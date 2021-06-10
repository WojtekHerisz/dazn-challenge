const { maxConcurrentStreams } = require("../../config/vars");
const NodeCache = require("node-cache");
const sessionsCache = new NodeCache();

/**
 * Sets new session ID in cache with initial stream number of 0
 * @public
 */
exports.setSession = (sessionId) => {
  try {
    sessionsCache.set(sessionId, { sessionId, currentStreamsNumber: 0 }, 10800);
    return sessionsCache.get(sessionId);
  } catch (error) {
    logger.error(`Error in session cache - setSession: ${error.message}`);
  }
};

/**
 * Checks for sessionId and returns current streams number
 * @public
 */
exports.checkSession = (sessionId) => {
  try {
    if (sessionsCache.get(sessionId)) {
      return sessionsCache.get(sessionId);
    } else return { error: true };
  } catch (error) {
    logger.error(`Error in session cache - checkSession: ${error.message}`);
  }
};
