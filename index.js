// console.log("Welcome to the Node.js application!");
import express from "express";
import http from "http";
import * as socketIo from "socket.io"



const app = express()
const server = http.createServer(app)
const io =  new socketIo.Server(server)
const PORT  = process.env.PORT || 3000

app.set("view engine", "ejs")
app.set(express.static(path.join(__dirname,"public")))

app.get("/",function(req,res){
res.send("hey")
})

server.listen(PORT)
