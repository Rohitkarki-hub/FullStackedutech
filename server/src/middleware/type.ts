import { Request } from "express";

export interface IExtendedRequest extends Request {
  user?: {
    id: string;
    username: string | null;
    email: string;
    role: string;
    currentInstituteNumber: string | number;
  };
  instituteNumber?: string | number;
}
