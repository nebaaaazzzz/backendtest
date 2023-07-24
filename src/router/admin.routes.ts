import { adminKeyboard } from "@src/components/keyboards";
import { MyContext } from "../types";
import { Composer } from "grammy";
import { FORMS } from "@src/config/constants";
import { getForms, paginateForms } from "@src/utils/admin/paginateForms";

export default function (adminRouter: Composer<MyContext>) {
  adminRouter.command("start", async (ctx) => {
    await ctx.reply("admin start", {
      reply_markup: adminKeyboard,
    });
  });

  adminRouter.hears(FORMS, getForms);
  adminRouter.callbackQuery(/^(\/form\/page\/.+)/gi, paginateForms);
}
