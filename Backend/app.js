const PrepareRoutes = require("./Router");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoConnect = require("./database/mongo"); // Import the Socket middleware

const { createServer } = require("http");
const { Server } = require("socket.io");
const { connection } = require("mongoose");
const handleSocket = require("./socket");

const app = express();
const port = 8080;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

handleSocket(io);

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

PrepareRoutes(app);

MongoConnect().catch((err) => {
  console.log("error while connecting database", err);
  process.exit(0);
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
