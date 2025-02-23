const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log('User Connected: ${socket.id}');

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log('User with ID: ${socket.id} joined room: ${data}');
  });


socket.on("send_message", (data) => {

    const systemMessage = {
        room: data.room,
        sender: "System",
        message:data.message,
    };

    // Send the system message ONLY to the sender
    socket.emit("receive_message", systemMessage);
});
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
