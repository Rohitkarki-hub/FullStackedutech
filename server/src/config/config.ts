import { config } from "dotenv";

config();

export const envconfig = {
  portNumber: process.env.PORT,
};
