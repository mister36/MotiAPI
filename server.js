// Imports
const fs = require("fs");
const dotenv = require("dotenv");
const https = require("https");

dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT;

const sslOptions = {
  key: fs.readFileSync(`${__dirname}/server.key`),
  cert: fs.readFileSync(`${__dirname}/server.cert`),
};

const app = require("./app");

// Start server
// https
//   .createServer(sslOptions, app)
//   .listen(port, () => console.log(`Cheer server running on port ${port}`));

// https.request({rejectUnauthorized: false})

// Start server
const expressServer = app.listen(port, () =>
  console.log(`Cheer server running on port ${port}`)
);
