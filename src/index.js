const { port, env } = require("./config/vars");
const logger = require("./config/logger");
const app = require("./config/express");

// listen to requests
app.listen(port, () =>
  logger.info(`Server started on port ${port}. Current env is ${env}`)
);

/**
 * Exports express
 * @public
 */
module.exports = app;
