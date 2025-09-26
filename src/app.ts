import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { StatusCodes } from "http-status-codes";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import v1Router from "./routes/v1/index.js";
import notFound from "./core/middlewares/notFound.middleware.js";
import errorMiddleware from "./core/middlewares/error.middleware.js";
import registerSocketHandlers from "./core/sockets/index.js";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

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

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/health", (req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .send("Hello, Welcome! This API is running perfectly.");
});

app.use("/api/v1", v1Router);

app.use(notFound);
app.use(errorMiddleware);

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
  pingInterval: 30000,
  pingTimeout: 60000,
});

registerSocketHandlers(io);

export default server;
