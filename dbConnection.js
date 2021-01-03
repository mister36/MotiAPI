const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/config.env` });

const mongoDB = process.env.MONGO_DB,
  mongoDBChat = process.env.MONGO_DB_CHATBOT,
  mongoPass = process.env.MONGO_PASSWORD;

const motiConn = mongoose.createConnection(
  `mongodb+srv://motiapp:${mongoPass}@moti1.piqgh.mongodb.net/${mongoDB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 10,
  }
);

const chatbotConn = mongoose.createConnection(
  `mongodb+srv://motiapp:${mongoPass}@moti1.piqgh.mongodb.net/${mongoDBChat}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 10,
  }
);

Promise.all([motiConn, chatbotConn])
  .then(() => {
    console.log("Connected to both databases");
  })
  .catch((err) => console.log("error: ", err));

exports.motiConn = motiConn;
exports.chatbotConn = chatbotConn;
