import { InlineKeyboard } from "grammy";
export const selectFormOptionKeyboard = new InlineKeyboard([
  [
    {
      text: " ሀገር ውስጥ ባሉ ኢትዮጵያውያን የሚሞላ",
      callback_data: "ሀገር",
    },
  ],
  [
    {
      text: "በውጪ ሀገር በሚኖሩ ኢትዮጵያዊያን እና ትውልደ ኢትዮጵያዊያን የውጪ ዜጋ የሚሞላ",
      callback_data: "ውጪ",
    },
  ],
  [
    {
      text: "በኩባንያ (ድርጅት) የሚሞላ",
      callback_data: "ኩባንያ",
    },
  ],
]);
