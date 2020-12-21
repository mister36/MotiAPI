// Imports
const fs = require("fs");
const dotenv = require("dotenv");
const { motiConn, chatbotConn } = require("./dbConnection");

dotenv.config({ path: `${__dirname}/config.env` });
const port = process.env.PORT;

const app = require("./app");

// Start server
const expressServer = app.listen(port, () =>
  console.log(`Cheer server running on port ${port}`)
);
