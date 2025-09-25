import { Server } from "socket.io";
import logisticsNamespace from "./logistics.js";

const registerSocketHandlers = async (io: Server) => {
  // global middleware for socket auth

  io.on("connection", (socket) => {
    const { role, companyId } = socket.data.user;

    if (companyId && (role === "admin" || role === "dispatcher")) {
      socket.join(`company:${companyId}`);
    }

    logisticsNamespace(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`disconnect socket${socket.id} (${reason}`);
    });
  });
};

export default registerSocketHandlers;
