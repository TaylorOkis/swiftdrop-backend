import jwt, { JwtPayload } from "jsonwebtoken";

const errorMessage = "Missing JWT variable in environment variable";

const generateToken = ({ payload }: { payload: any }): string => {
  if (!process.env.JwT_SECRET) {
    throw new Error(errorMessage);
  }
  if (!process.env.JWT_LIFETIME) {
    throw new Error(errorMessage);
  }

  const token = jwt.sign(payload!, process.env.JWT_SECRET as string, {
    expiresIn: (process.env.JWT_LIFETIME as any) ?? "1d",
  });
  return token;
};

const verifyToken = ({ token }: { token: string }): JwtPayload | string => {
  if (!process.env.JWT_SECRET) {
    throw new Error(errorMessage);
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };
