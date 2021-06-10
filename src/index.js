const port = 3000;
const app = require("./config/express");

// listen to requests
app.listen(port, () => console.log(`Server started on port ${port}.`));

/**
 * Exports express
 * @public
 */
module.exports = app;
