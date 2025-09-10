import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { StatusCodes } from "http-status-codes";
import { Server } from "socket.io";

import v1Router from "./routes/v1/index.js";
import notFound from "./core/middlewares/notFound.middleware.js";
import errorMiddleware from "./core/middlewares/error.middleware.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

// Websocket
const usersConnected = new Map();
const driverConnected = new Map();
const orderCustomerMap = new Map();

io.on("connection", (socket) => {
  // Register connection
  socket.on(
    "connect-user",
    ({
      userId,
      role,
      vendorId,
    }: {
      userId: string;
      role: string;
      vendorId: string;
    }) => {
      switch (role) {
        case "ADMIN":
          usersConnected.set(userId, socket.id);
          socket.join("admin-room");
          break;
        case "DRIVER":
          usersConnected.set(userId, socket.id);
          break;
        case "DISPATCHER":
          usersConnected.set(userId, socket.id);
          socket.join("admin-room");
          break;
        case "CUSTOMER":
          usersConnected.set(userId, socket.id);
          break;
        case "default":
          throw new Error("Invalid role");
      }
    }
  );

  // Receive and Emit Driver location/ETA
  socket.on("location-update", async ({ driverId, lat, lng }) => {
    // Emit location to admin and dispatcher
    io.in("admnin-room").emit("driver-location", { driverId, lat, lng });

    // Emit ETA to customers who are connected (online)
  });

  // Disconnect User
});

app.get("/health", (req: Request, res: Response) => {
  res
    .status(StatusCodes.CREATED)
    .send("Hello, Welcome! This API is running perfectly.");
});

app.use("/api/v1", v1Router);

app.use(notFound);
app.use(errorMiddleware);

export default app;
