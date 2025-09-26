import { Server } from "socket.io";
import logisticsNamespace from "./logistics.js";
import { socketAuth } from "../middlewares/socketAuth.middleware.js";
import { UserPayload } from "../types/types.js";

const registerSocketHandlers = async (io: Server) => {
  // global middleware for socket auth
  io.use(socketAuth);

  io.on("connection", (socket) => {
    const { role, companyId } = socket.data.user as UserPayload;

    if (companyId && (role === "ADMIN" || role === "DISPATCHER")) {
      socket.join(`company:${companyId}`);
    }

    logisticsNamespace(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`disconnect socket${socket.id} (${reason}`);
    });
  });
};

export default registerSocketHandlers;
