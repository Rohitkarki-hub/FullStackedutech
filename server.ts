import app from "./src/app";
import { envconfig } from "./src/config/config";
import "./src/database/connection";

function startServer() {
  const port = envconfig.portNumber;
  app.listen(port, function () {
    console.log(`server started at ${port}`);
  });
}

startServer();
