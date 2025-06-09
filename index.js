const express = require("express");
const CORS = require("cors");
const path = require("path");
const { Server } = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

mongoose.set("strictQuery", false);

app.use(express.json());

app.use(
  CORS({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_DB_URI;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// connect mongoDB

async function ConnectMongoDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection failed:", err.message);
  }
}

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  console.log("connected");
  socket.on("disconnect", function () {
    io.emit("user-disconnected", { id: socket.id });
  });
});

app.get("/", function (req, res) {
  res.render("Document", {
    title: "criminal alert application",
    message: "Hello from EJS!",
  });
});

ConnectMongoDB()
  .then(() => {
    server.listen(PORT, function () {
      console.log(`Server is running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error in connecting to MongoDB:", err.message);
    process.exit(1);
  });
