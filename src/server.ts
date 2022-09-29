import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { initialise } from "farm";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const world = initialise(
  (farmId, cropId) => {
    io.emit("harvest", { farmId, cropId });
  }
);

world.subscribe((worldState) => {
  io.emit("world update", worldState);
});

io.on("connection", () => {
  console.debug("User connected");
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing all connections");
  io.close((err) => {
    if (err === undefined) {
      console.log("Server closed");
    } else {
      console.error("Unable to close process:", err.message);
    }
  })
})

server.listen(1995);
