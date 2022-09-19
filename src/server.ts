import { Server } from "socket.io";
import { initialise } from "farm";

const io = new Server(1995, {
  cors: {
    origin: "*",
  },
});

initialise(
  (farmId, cropId) => {
    console.debug(`Harvesting farm ${farmId} containing crop ${cropId}`);

    io.emit("harvest", { farmId, cropId });
  }
);

io.on("connection", (socket) => {
  console.debug("User connected");
});
