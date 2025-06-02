// console.log("Welcome to the Node.js application!");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const http = require("http");
const mongoose = require("mongoose"); 
// const ejs = require("ejs")

const app = express();
app.use(express.json())
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

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

server.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
