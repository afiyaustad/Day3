const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let tasks = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("loadTasks", tasks);

  socket.on("addTask", (task) => {
    tasks.push(task);
    io.emit("taskUpdated", tasks);
    io.emit("notification", `New task added: ${task.title} (Assigned to: ${task.assignee})`);
  });

  socket.on("deleteTask", (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
    io.emit("taskUpdated", tasks);
    io.emit("notification", "A task was deleted!");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
