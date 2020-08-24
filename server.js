// Imports
const fs = require("fs");
const dotenv = require("dotenv");
const spdy = require("spdy");

dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT;

const sslOptions = {
  key: fs.readFileSync(`${__dirname}/privateKey.key`),
  cert: fs.readFileSync(`${__dirname}/certificate.crt`),
};

const app = require("./app");

// Start server
// const server = spdy.createServer(sslOptions, app);

// server.on('stream', (stream, requestHeaders) =)

// server.listen(port, (err) => {
//   if (err) {
//     console.error(error);
//     return process.exit(1);
//   } else {
//     console.log(`Cheer server running on port ${port}`);
//   }
// });

// Start server
const expressServer = app.listen(port, () =>
  console.log(`Cheer server running on port ${port}`)
);
