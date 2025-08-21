import { Request } from "express";

type UserPayload = {
  id: string;
  role: string;
  company_id: string;
};

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
    company_id: string;
  };
}

export { UserPayload, CustomRequest };
