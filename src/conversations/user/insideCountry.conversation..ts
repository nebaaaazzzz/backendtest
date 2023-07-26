import { PhotoSize } from "grammy/types";
import { MyContext, MyConversation } from "../../types";
import { buildMessage } from "@src/utils/user/message";
import { User } from "@src/entity/user";
import {
  mainMenu,
  terminateKeyboard,
  terminateSkipKeyboard,
} from "@src/components/keyboards";
import bot from "@src/config/botConfig";
import {
  ADMIN_TELEGRAM_ID,
  EmailRegExp,
  PhoneRegExp,
} from "@src/config/constants";
export async function insideCountryConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  let personalInfo = [
    // "ስም እስከ አያት",
    // "Full name in English",
    // // "አድራሻ",
    // "ክልል",
    // "ከተማ",
    // "ክ/ከተማ",
    // "ወረዳ",
    // "ቀበሌ",
    "የቤት ቁጥር",
    "ፖ.ሣ.ቁ.  (ካለዎት)",
    "ስልክ / ሞባይል",
    "የግብር ከፋይ መለያ ቁጥር", //TODO: SKIP
    // "ኢሜል",
    // "የመታወቂያ ቁጥር",
  ];
  let personalInfoVals = [];
  await ctx.reply("በግለሰብ የሚሞላ", {
    reply_markup: {
      remove_keyboard: true,
    },
  });
  for await (const info of personalInfo) {
    let personalInfoVal;
    if (info === "ፖ.ሣ.ቁ.  (ካለዎት)") {
      await ctx.reply(info, {
        reply_markup: terminateSkipKeyboard,
      });
      let res = (await conversation.waitFor(":text")).message?.text;
      if (res === "ዝለል") {
        personalInfoVal = "";
      } else {
        personalInfoVal = res;
      }
    } else {
      await ctx.reply(info, {
        reply_markup: terminateKeyboard,
      });
      if (info === "ስልክ / ሞባይል") {
        personalInfoVal = (
          await conversation.waitForHears(PhoneRegExp, async (ctx) => {
            await ctx.reply("እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ");
          })
        ).message?.text as string;
      } else if (info === "ኢሜል") {
        personalInfoVal = (
          await conversation.waitForHears(EmailRegExp, async (ctx) => {
            await ctx.reply("ትክክለኛውን ኢሜይል ያስገቡ");
          })
        ).message?.text as string;
      } else {
        personalInfoVal = (await conversation.waitFor(":text")).message
          ?.text as string;
      }
    }
    personalInfoVals.push(personalInfoVal);
  }
  await ctx.reply("ተወካይ መረጃ አለ?", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [
        [
          {
            text: "አዎ",
          },
        ],
        [
          {
            text: "አይ",
          },
        ],
      ],
    },
  });
  const isThereRepresentative = (await conversation.waitFor(":text")).message
    ?.text;
  let representative: string[] = [];
  let representativeInfoVals = [];
  if (isThereRepresentative === "አዎ") {
    representative = [
      "ስም እስከ አያት",
      "ከተማ",
      "ክ/ከተማ",
      "ወረዳ",
      "ቀበሌ",
      "የቤት ቁጥር",
      "ፖ.ሣ.ቁ.  (ካለዎት)",
      "ስልክ / ሞባይል",
      "ፋክስ",
      "ኢሜል",
    ];
    await ctx.reply("የግለሰብ ተወካይ መረጃ");
    for await (const info of representative) {
      let representativeInfoVal;
      if (info === "ፖ.ሣ.ቁ.  (ካለዎት)") {
        await ctx.reply(info, {
          reply_markup: terminateSkipKeyboard,
        });
        let res = (await conversation.waitFor(":text")).message?.text;
        if (res === "ዝለል") {
          representativeInfoVal = "";
        } else {
          representativeInfoVal = res;
        }
      } else {
        await ctx.reply(info, {
          reply_markup: terminateKeyboard,
        });
        if (info === "ስልክ / ሞባይል") {
          representativeInfoVal = (
            await conversation.waitForHears(PhoneRegExp, async (ctx) => {
              await ctx.reply("እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ");
            })
          ).message?.text as string;
        } else if (info === "ኢሜል") {
          representativeInfoVal = (
            await conversation.waitForHears(EmailRegExp, async (ctx) => {
              await ctx.reply("ትክክለኛውን ኢሜይል ያስገቡ");
            })
          ).message?.text as string;
        } else {
          representativeInfoVal = (await conversation.waitFor(":text")).message
            ?.text as string;
        }
      }

      representativeInfoVals.push(representativeInfoVal);
    }
  }

  // let shareBuyInfo = [
  //   "ቃል የተገባ የአክስዮን ብዛት (በቁጥር)",
  //   "ቃል የተገባ የአክስዮን ብዛት (በፊደል)",
  //   "የአክሲዮኖች ድምር ዋጋ",
  // ];
  // let shareBuyInfoVals = [];
  // await ctx.reply(
  //   "የአክስዮን ግዥ መረጃዎች \n እያንዳንዱ አክስዮን መሸጫ መደበኛ ዋጋ (Par value) ብር 1000.00 (አንድ ሺህ ብር) ነው"
  // );
  // for (const info in shareBuyInfo) {
  //   await ctx.reply(shareBuyInfo[info], {
  //     reply_markup: terminateKeyboard,
  //   });
  //   let shareBuyInfoVal: number | string;
  //   if (info === "0") {
  //     shareBuyInfoVal = await conversation.form.number(async (ctx) => {
  //       await ctx.reply("እባክዎ ቁጥር ያስገቡ");
  //     });
  //   } else {
  //     shareBuyInfoVal = (await conversation.waitFor(":text")).message
  //       ?.text as string;
  //   }
  //   shareBuyInfoVals.push(shareBuyInfoVal);
  // }

  // await ctx.reply("የአክስዮን ግዥ አከፋፈል ሁኔታ", {
  //   reply_markup: {
  //     inline_keyboard: [
  //       [
  //         {
  //           text: "ይህ ስምምነት እንደተፈረመ የጠቅላላ አክሲዮኖች ዋጋ ሙሉ ለመክፈል ተስማምቻለሁ",
  //           callback_data: "ሙሉ",
  //         },
  //       ],
  //       [
  //         {
  //           text: "ይህ ስምምነት እንደተፈረመ የመጀመሪያ ክፍያ (50 በመቶ) የመጀመሪያውን ክፍያ በተከፈለ እስከ 6 ወር ጊዜ ውስጥ አጠናቅቄ ለመክፈል ተስማምቻለሁ",
  //           callback_data: "ግማሽ",
  //         },
  //       ],
  //     ],
  //   },
  // });

  // let paymentOption = (await conversation.waitFor("callback_query:data"))
  //   .callbackQuery.data;

  // await ctx.reply("የአገልግሎት ክፍያ", {
  //   reply_markup: terminateKeyboard,
  // });
  // const serviceCharge = (await conversation.waitFor(":text")).message
  //   ?.text as string;
  // if (serviceCharge === "ማቋረጥ") {
  //   return;
  // }
  // //TODO: INCLUDE IN FORM ይህን የአክሲዮን መግዣ ቅፅ እንደተሞላ ከመጀመሪያ ክፍያ ጋር ሙሉ በሙሉ ለመክፈል ተስማምቻለው፡፡

  // let concludeInfo = [
  //   "የአክሲዮን ገዢው /የተወካይ/ ስም",
  //   "አክሲዮን የተገዛበት ቀን",
  //   "ስለ አክሲዮን ሽያጩ ከማን/ከየት ሰሙ ?",
  //   "በማን አስታዋሽነት ገዙ ? ",
  // ];
  // let concludeInfoVals = [];
  // await ctx.reply("ማጠቃለያ");
  // for await (const info of concludeInfo) {
  //   await ctx.reply(info);
  //   const concludeInfoVal = (await conversation.waitFor(":text")).message
  //     ?.text as string;
  //   concludeInfoVals.push(concludeInfoVal);
  // }

  let imges = [
    "የታደሰ መታወቂያ/መንጃ ፈቃድ/ፓስፖርት \n የታደሰ መታወቂያ/መንጃ ፈቃድ/ፓስፖርት ኮፒ እዚህ ጋር ያያይዙ",
    // "የባንክ ደረሰኝ * \n ባንክ ያስገቡበትን ደረሰኝ እዚህ ጋር ያያይዙ",
    // "የውክልና ማስረጃ \n የሚሞላው በወኪል ከሆነ ሕጋዊ የውክልና ማስረጃዎትን እዚህ ጋር ያያይዙ",
    // "ፊርማ \n ስካን የተደረገ ወይም በካሜራ የተነሳ ፊርማ እዚህ ጋር ያያይዙ",
  ];
  let loadedImages: PhotoSize[][] = [];
  for await (const info of imges) {
    await ctx.reply(info, {
      reply_markup: terminateKeyboard,
    });
    const loadedImg = (await conversation.waitFor(":photo")).message
      ?.photo as PhotoSize[];
    loadedImages.push(loadedImg);
  }
  let toStore = {
    data: [
      [personalInfo, personalInfoVals],
      // [representative, representativeInfoVals],
      // [shareBuyInfo, shareBuyInfoVals],
      // [["የአክስዮን ግዥ አከፋፈል ሁኔታ"], [paymentOption]],
      // [["የአገልግሎት ክፍያ"], [serviceCharge]],
      // [concludeInfo, concludeInfoVals],
    ],
    images: loadedImages,
  };
  await ctx.replyWithMediaGroup(buildMessage(toStore.data, toStore.images));
  await ctx.reply("እርግጠኛ ነዎት ይህን መረጃ ማስገባት ይፈልጋሉ?", {
    reply_markup: {
      remove_keyboard: true,
      inline_keyboard: [
        [
          {
            callback_data: "YES",
            text: "አዎ",
          },
        ],
        [
          {
            callback_data: "NO",
            text: "አይ",
          },
        ],
      ],
    },
  });

  const res = (await conversation.waitFor("callback_query:data")).callbackQuery
    .data;

  if (res === "YES") {
    const a = new User();
    a.value = toStore;
    await a.save();
    ctx.reply("በተሳካ ሁኔታ ገብቷል።", {
      reply_markup: mainMenu,
    });
    await bot.api.sendMediaGroup(
      ADMIN_TELEGRAM_ID,
      buildMessage(toStore.data, toStore.images)
    );
  } else {
    ctx.reply("ተጥሏል።", {
      reply_markup: mainMenu,
    });
  }
}
