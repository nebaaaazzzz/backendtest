import "reflect-metadata";
import { GrammyError, HttpError } from "grammy";
import { conversations } from "@grammyjs/conversations";
import bot from "./config/botConfig";
import router from "./config/router";
import adminRoutes from "./router/admin.routes";
import userRoutes from "./router/user.routes";
import { ADMIN, USER } from "./config/constants";
import AppDataSource from "./config/db";
import { mainMenu } from "./components/keyboards";
async function bootstrap() {
  bot.api.setMyCommands([
    {
      command: "start",
      description: "start bot ",
    },
  ]);
  try {
    await AppDataSource.initialize();

    bot.use(conversations());
    // TO DOWNLOAD FILE FROM TELEGRAM
    // https://api.telegram.org/file/bot<token>/<file_path>
    // getFile return the file path . bot can download max 20MB
    bot.hears("ማቋረጥ", async (ctx) => {
      await ctx.conversation.exit();
      await ctx.reply("Leaving.", {
        reply_markup: mainMenu,
      });
    });
    bot.use(router);
    adminRoutes(router.route(ADMIN));
    userRoutes(router.route(USER));

    bot.catch((err) => {
      const ctx = err.ctx;
      console.error(`Error while handling update ${ctx.update.update_id}:`);
      const e = err.error;
      if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
      } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
      } else {
        console.error("Unknown error:", e);
      }
    });
    // });
    bot.start({
      onStart: (botInfo) => {
        console.log("Started on :", botInfo.username);
      },
    });
  } catch (err: any) {
    console.log("db connection failed : ", err.message);
    process.exit(1);
  }
}
bootstrap();
