import { Router } from "@grammyjs/router";
import { ADMIN_TELEGRAM_USERNAME, USER, ADMIN } from "./constants";
import { MyContext } from "../types";

const router = new Router<MyContext>(async (ctx) => {
  if (ctx.from?.username == ADMIN_TELEGRAM_USERNAME) {
    return ADMIN;
  }
  return USER;
});

export default router;
