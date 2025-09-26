import { UnAuthenticatedError } from "../errors/error/index.js";
import { verifyToken } from "../utils/jwt.util.js";
import { ExtendedError, Socket } from "socket.io";
import cookie from "cookie";
import { UserPayload } from "../types/types.js";

export function socketAuth(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  try {
    const rawCookie = socket.handshake.headers.cookie;
    if (!rawCookie) return next(new UnAuthenticatedError("No cookies sent"));

    const parsedCookies = cookie.parse(rawCookie);

    const userToken = parsedCookies["authToken"];
    if (!userToken)
      return next(new UnAuthenticatedError("Auth cookie missing"));

    const user = verifyToken({ token: userToken });

    socket.data.user = user as UserPayload;

    return next();
  } catch (err) {
    return next(new UnAuthenticatedError("Authentication Error"));
  }
}
