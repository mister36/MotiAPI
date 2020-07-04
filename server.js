// Imports
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

const app = require("./app");

// Start server
app.listen(port, () => console.log(`Cheer server running on port ${port}`));
