import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { StatusCodes } from "http-status-codes";
import { Server } from "socket.io";

import v1Router from "./routes/v1/index.js";
import notFound from "./core/middlewares/notFound.middleware.js";
import errorMiddleware from "./core/middlewares/error.middleware.js";

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5501",
  "http://127.0.0.1:5501",
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  "http://localhost:5500",
  "http://127.0.0.1:5500",
];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });

app.use(express.json());
app.use(cors(corsOptions));

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
        default:
          throw new Error("Invalid role");
      }
    }
  );

  // Receive and Emit Driver location/ETA
  socket.on("location-update", async ({ driverId, lat, lng }) => {
    // Emit location to admin and dispatcher
    io.in("admin-room").emit("driver-location", { driverId, lat, lng });

    // Emit ETA to customers who are connected (online)
  });

  // Disconnect User
  socket.on("disconnect", async () => {
    for (const [userId, socketId] of usersConnected.entries()) {
      if (socketId === socket.id) {
        usersConnected.delete(userId);
        break;
      }
    }
  });
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
