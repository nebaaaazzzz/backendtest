import { createConversation } from "@grammyjs/conversations";
import { Composer } from "grammy";
import { MyContext } from "../types";
import { insideCountryConversation } from "@src/conversations/user/insideCountry.conversation.";
import { outsideCountryConversation } from "@src/conversations/user/outsideCountry.conversation.";
import { companyConversation } from "@src/conversations/user/company.conversation.";
import { selectFormOptionKeyboard } from "@src/components/inline-keyboard";
import { mainMenu } from "@src/components/keyboards";

export default function (userRouter: Composer<MyContext>) {
  userRouter.errorBoundary((err) => {
    console.log("house rent post conversaion : ", err.message);
  }, createConversation(insideCountryConversation));
  userRouter.errorBoundary((err) => {
    console.log("house rent post conversaion : ", err.message);
  }, createConversation(outsideCountryConversation));
  userRouter.errorBoundary((err) => {
    console.log("house rent post conversaion : ", err.message);
  }, createConversation(companyConversation));
  userRouter.command("start", async (ctx) => {
    await ctx.reply(`Hello! /  ሰላም ${ctx?.from?.first_name}`, {
      reply_markup: mainMenu,
    });
  });
  userRouter.hears("ቅጽ መሙላት", async (ctx) => {
    await ctx.reply("ይምረጡ", {
      reply_markup: selectFormOptionKeyboard,
    });
  });
  userRouter.hears("ስለ እኛ", async (ctx) => {
    await ctx.reply("This Info is About Us");
  });
  userRouter.callbackQuery("ሀገር", async (ctx) => {
    try {
      await ctx.answerCallbackQuery();
    } catch (err) {}
    await ctx.conversation.enter("insideCountryConversation");
  });
  userRouter.callbackQuery("ውጪ", async (ctx) => {
    try {
      await ctx.answerCallbackQuery();
    } catch (err) {}
    await ctx.conversation.enter("outsideCountryConversation");
  });
  userRouter.callbackQuery("ኩባንያ", async (ctx) => {
    try {
      await ctx.answerCallbackQuery();
    } catch (err) {}
    await ctx.conversation.enter("companyConversation");
  });
}
