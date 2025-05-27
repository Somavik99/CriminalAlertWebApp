// console.log("Welcome to the Node.js application!");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const http = require("http");


const app = express()
const server = http.createServer(app)
const io =  new Server(server)
const PORT  = process.env.PORT || 3000

app.set("view engine", "ejs")
app.set(express.static(path.join(__dirname,"public")))

io.on("connection",function(socket){
    console.log("connected")
})


app.get("/",function(req,res){
res.render("Index")
})

server.listen(PORT)
