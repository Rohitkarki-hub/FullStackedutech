import { Sequelize } from "sequelize-typescript";
import { config } from "dotenv";

config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "mysql",
  models: [__dirname + "/models/*.model.ts"],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync({ alter: false }).then(() => {
  console.log("migration successful");
});

export default sequelize;
