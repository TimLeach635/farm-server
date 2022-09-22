import { Server } from "socket.io";
import { initialise } from "farm";

const io = new Server(1995, {
  cors: {
    origin: "*",
  },
});

const world = initialise(
  (farmId, cropId) => {
    console.debug(`Harvesting farm ${farmId} containing crop ${cropId}`);

    io.emit("harvest", { farmId, cropId });
  }
);

world.subscribe((worldState) => {
  io.emit("world update", worldState);
  console.debug("Sending world update:\n", JSON.stringify(worldState, null, 2));
});

io.on("connection", () => {
  console.debug("User connected");
});
