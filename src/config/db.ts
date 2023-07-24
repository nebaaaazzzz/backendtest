import { DataSource } from "typeorm";
import { Session } from "../entity/session";
import dotenv from "dotenv";
import { User } from "@src/entity/user";
dotenv.config();
const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL,
  type: "mysql",
  // host: "localhost",
  // port: 3306,
  // username: "root",
  // password: "",
  synchronize: true,
  logging: false,
  entities: [Session, User],
  subscribers: [],
  migrations: [],
});
export default AppDataSource;
