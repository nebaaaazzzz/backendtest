import dotenv from "dotenv";
dotenv.config();
import { Bot, session } from "grammy";
import { MyContext } from "../types";
import { TypeormAdapter } from "@grammyjs/storage-typeorm";
import { Session } from "../entity/session";
import dataSource from "./db";

// const bot = new Bot<MyContext>(process.env.TELEGRAM_TOKEN);
interface SessionData {
  __language_code?: string;
}

const bot = new Bot<MyContext>(process.env.TELEGRAM_TOKEN);

// Remember to register `session` middleware before
// registering middleware of the i18n instance.
bot.use(
  session<SessionData, MyContext>({
    initial: () => {
      return {};
    },
    storage: new TypeormAdapter({
      repository: dataSource.getRepository(Session),
    }),
  })
);

export default bot;
