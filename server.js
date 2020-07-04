// Imports
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

console.log(process.env.NODE_ENV);

const app = require("./app");

// Start server
app.listen(port, () => console.log(`Cheer server running on port ${port}`));
