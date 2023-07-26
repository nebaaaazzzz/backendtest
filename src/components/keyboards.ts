import { FORMS } from "@src/config/constants";
import { Keyboard } from "grammy";
export const mainMenu = new Keyboard([
  [
    {
      text: "ቅጽ መሙላት",
    },
  ],
  [
    {
      text: "ስለ እኛ",
    },
  ],
]).resized(true);

export const terminateKeyboard = new Keyboard([
  [
    {
      text: "ማቋረጥ",
    },
  ],
]).resized(true);
export const terminateSkipKeyboard = new Keyboard([
  [
    {
      text: "ማቋረጥ",
    },
  ],
  [
    {
      text: "ዝለል",
    },
  ],
]).resized(true);
export const adminKeyboard = new Keyboard([
  [
    {
      text: FORMS,
    },
  ],
]).resized(true);
