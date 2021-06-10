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

/**
 * Increasing current session number by 1 and returning current sessions
 * Additionally checks if session number is not higher than set in env var
 * @public
 */
exports.addStreamToSession = (sessionId) => {
  try {
    let { currentStreamsNumber } = sessionsCache.get(sessionId);
    if (currentStreamsNumber >= maxConcurrentStreams) {
      sessionsCache.set(
        sessionId,
        {
          sessionId,
          currentStreamsNumber: currentStreamsNumber,
          limitReached: true,
        },
        10800
      );
      return sessionsCache.get(sessionId);
    } else {
      sessionsCache.set(
        sessionId,
        { sessionId, currentStreamsNumber: currentStreamsNumber + 1 },
        10800
      );
      return sessionsCache.get(sessionId);
    }
  } catch (error) {
    logger.error(
      `Error in session cache - addStreamToSession: ${error.message}`
    );
  }
};

/**
 * Decreasing current session number by 1 and returning current sessions
 * @public
 */
exports.removeStreamFromSession = (sessionId) => {
  try {
    let { currentStreamsNumber } = sessionsCache.get(sessionId);
    if (currentStreamsNumber <= 0) {
      sessionsCache.set(
        sessionId,
        {
          sessionId,
          currentStreamsNumber: currentStreamsNumber,
        },
        10800
      );
      return sessionsCache.get(sessionId);
    } else {
      sessionsCache.set(
        sessionId,
        { sessionId, currentStreamsNumber: currentStreamsNumber - 1 },
        10800
      );
      return sessionsCache.get(sessionId);
    }
  } catch (error) {
    logger.error(
      `Error in session cache - removeStreamFromSession: ${error.message}`
    );
  }
};
