import { Request } from "express";

interface UserPayload {
  id: string;
  role: string;
  companyId: string;
}

type LocationPayload = {
  orderId: string;
  lat: number;
  lng: number;
  timestamp?: string;
};

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
    company_id: string;
  };
}

export { UserPayload, LocationPayload, CustomRequest };
