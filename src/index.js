const { port, env } = require("./config/vars");
const app = require("./config/express");

// listen to requests
app.listen(port, () =>
  console.log(`Server started on port ${port}. Current env is ${env}`)
);

/**
 * Exports express
 * @public
 */
module.exports = app;
