import { Response } from "express";

import { generateToken } from "./jwt.util.js";
import { UserPayload } from "@/core/types/types.js";

export default function attachAuthCookieToResponse({
  res,
  user,
}: {
  res: Response;
  user: UserPayload;
}) {
  const authToken = generateToken({ payload: user });
  const threeDays = 1000 * 60 * 60 * 72;

  res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + threeDays),
    signed: true,
    sameSite: "none",
  });
}
