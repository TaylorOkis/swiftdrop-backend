import { Server, Socket } from "socket.io";
import { TrackService } from "@/modules/track/index.js";
import calculateETA from "../utils/eta.util.js";
import { LocationPayload, UserPayload } from "../types/types.js";

const trackService = new TrackService();
const logisticsNamespace = async (io: Server, socket: Socket) => {
  const user = socket.data.user as UserPayload;
  socket.on("driver:location:update", async (payload: LocationPayload) => {
    try {
      if (!user || user.role !== "DRIVER") {
        socket.emit("error", { code: "FORBIDDEN", message: "Drivers only" });
        return;
      }

      const { orderId, lat, lng, timestamp } = payload || {};
      if (!orderId) {
        socket.emit("error", { code: "INVALID_PAYLOAD" });
        return;
      }
      const location = {
        driverId: user.id,
        lat,
        lng,
        timestamp: timestamp || Date.now(),
      };

      if (user.companyId) {
        io.to(`company:${user.companyId}`).emit("driver-location", location);
      }

      const orders = await trackService.getOrdersForDriver(user.id);

      for (const order of orders) {
        // Only compute ETA if customer is connected to socket server
        const room = io.sockets.adapter.rooms.get(`order:${order.id}`);
        if (!room) continue;

        await Promise.all(
          Array.from(room).map(async (socketId) => {
            const customerSocket = io.sockets.sockets.get(socketId)!;
            const customerLocation = customerSocket?.data?.user?.location;
            if (!customerLocation) return;
            const ETA = await calculateETA({ lat, lng }, customerLocation);
            customerSocket.emit("eta-update", {
              orderId: order.id,
              ...ETA,
            });
          })
        );
      }
    } catch (error) {
      socket.emit("error", {
        code: "INTERNAL_ERROR",
        message: "An error occurred with socket.io",
      });
    }
  });

  socket.on("customer:join:order", async (orderId: string) => {
    try {
      if (!user || user.role !== "customer") {
        return socket.emit("error", {
          code: "FORBIDDEN",
          message: "Customers only",
        });
      }
      if (!orderId) return socket.emit("error", { code: "INVALID_ORDER" });

      socket.join(`order:${orderId}`);
    } catch (error) {
      socket.emit("error", {
        code: "INTERNAL_ERROR",
        message: "An error occurred with socket.io",
      });
    }
  });
};

export default logisticsNamespace;
