# Dazn Coding Challenge

Build a service in Node.js that exposes an API which can be consumed from any client.
This service must check how many video streams a given user is watching and prevent a user
from watching more than 3 video streams concurrently.

## Installation

Use the package manager **npm** to install.

```bash
# Install dependencies
npm install

# Create .env file with env variables
cp .env.template .env

# Generate api documentation which will be
# available via http://localhost:3000/v1/doc (by default)
apidoc -i src/
```

## Usage

```bash
# Start using predefined start script (nodemon)
npm start

# Start manually
node .\src\index.js

# Start manually using nodemon
nodemon .\src\index.js
```

## Origin

At the beginning, I was wondering how to define the user of the application. Should I define it by IP address? This does not make sense to me as it could cause problems with shared IP addresses. Maybe cookies or session definition based on browser etc? But I think that if the solution is to be universal and the client can be both - a browser or a mobile application or even something else, it will not work in 100% either. As required in document, I was also not able to use authentication.

So in the end I decided to simply generate a random session id. This solution can be used by most, if not every, front-end client. And in the future, this would allow for a simple implementation of authentication.

## How it works?

It is really simple API which has 4 endpoints and 2 helper endpoints. All of them are described quite well in auto generated documentation using apidoc npm module.

- POST /v1/session - creating a sessionId
- GET /v1/session - gets info about created session

Request body:

```json
{ "sessionId": "xxxxxxxxx" }
```

- POST /v1/stream - is increasing current stream counter and is not allowing to cross the limit of 3. If user will try to open 4th stream it will add new parameter **limitReached** set as true so the client may know that user reached the limit. The limit can be changed in .env. In future to the controller of this endpoint there could be added for example sending URL of video etc.

Request body:

```json
{ "sessionId": "xxxxxxxxx" }
```

- DELETE /v1/stream - is decreasing of current stream counter.

Request body:

```json
{ "sessionId": "xxxxxxxxx" }
```

\*_xxxxxxxxx - sessionId from POST /v1/session_

The session is stored using node-cache. It is pretty reliable and fast solution but for bigger scale I would think of some non-relational DB.

---

- GET /v1/doc - documentation of API. Can be viewed only if previously has been generated. Please see last step of **Installation**
- GET /v1/status - just simple keepalive endpoint

For the express.js boilerplate I used fragments of my favourite [boilerplate](https://github.com/danielfsousa/express-rest-boilerplate) which has few most important things to start such as _helmet_ for security, logging with _morgan_ and _winston_ etc.

## Scalability

Containerization could be used for scaling. You could also use the built-in node.js cluster mechanism. However, in because of the use of the node-cache module, in case of node.js cluster you should think about a mechanism for sharing some information.

## If I had more time... ;)

Of course I realize this simple API is not perfect. If I were to develop it further, I would think of the following things:

- Adding better verification of user input
- Better error handling - for now it is really simple
- Of course testing using mocha.js, chai etc. - sorry but there was not much time for this :(
- Better documentation, maybe some screenshots etc.
- And few other minor mistakes

---

If you will have any questions please feel free to contact me.

I will really appreciate any feedback and comments.
