const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const routes = require("../api/routes/v1");
const { logs } = require("./vars");

/**
 * Express instance
 * @public
 */
const app = express();

app.use(bodyParser.json());

// request logging. dev: console | production: file
app.use(morgan(logs));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// to serve static files of api-doc we there is a need to change src headers
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      "default-src": helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
      "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    },
  })
);

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount api v1 routes
app.use("/v1", routes);

module.exports = app;
