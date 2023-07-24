import { mainMenu, terminateKeyboard } from "@src/components/keyboards";
import bot from "@src/config/botConfig";
import {
  ADMIN_TELEGRAM_ID,
  EmailRegExp,
  PhoneRegExp,
} from "@src/config/constants";
import { User } from "@src/entity/user";
import { MyContext, MyConversation } from "@src/types";
import { buildMessage } from "@src/utils/user/message";
import { PhotoSize } from "grammy/types";

export async function companyConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  let companyInfo = [
    "የኩባንያው/ድርጅቱ ስም",
    "Company Name in English",
    "አድራሻ",
    "ክልል",
    "ከተማ",
    "ክ/ከተማ",
    "ወረዳ",
    "ቀበሌ",
    "የቤት ቁጥር",
    "ፖ.ሣ.ቁ.  (ካለዎት)",
    "ስልክ / ሞባይል",
    "የቤት/የሥራ ቦታ",
    "ፋክስ",
    "ኢሜል",
    "የኩባንያው/ድርጅቱ የንግድ ምዝገባ ቁጥር",
    "የግብር ከፋይ መለያ ቁጥር",
  ];
  let companyVals = [];
  await ctx.reply("የኩባንያው ሕጋዊ ወኪል መረጃ");
  for await (const info of companyInfo) {
    await ctx.reply(info, {
      reply_markup: terminateKeyboard,
    });
    let companyVal;
    if ("ስልክ / ሞባይል") {
      companyVal = (
        await conversation.waitForHears(PhoneRegExp, async (ctx) => {
          await ctx.reply("እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ");
        })
      ).message?.text as string;
    } else if (info === "ኢሜል") {
      companyVal = (
        await conversation.waitForHears(EmailRegExp, async (ctx) => {
          await ctx.reply("ትክክለኛውን ኢሜይል ያስገቡ");
        })
      ).message?.text as string;
    } else {
      companyVal = (await conversation.waitFor(":text")).message
        ?.text as string;
    }
    companyVals.push(companyVal);
  }
  const representative = [
    "ስም እስከ አያት",
    "ከተማ",
    "ክ/ከተማ",
    "ወረዳ",
    "ቀበሌ",
    "የቤት ቁጥር",
    "ፖ.ሣ.ቁ.  (ካለዎት)",
    "ስልክ / ሞባይል",
    "የቤት/የሥራ ቦታ",
    "ፋክስ",
    "ኢሜል",
  ];
  let representativeInfoVals = [];
  await ctx.reply("የግለሰብ ተወካይ መረጃ");
  for await (const info of representative) {
    await ctx.reply(info, {
      reply_markup: terminateKeyboard,
    });
    let representativeInfoVal;
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
    representativeInfoVals.push(representativeInfoVal);
  }

  let shareBuyInfo = [
    "ቃል የተገባ የአክስዮን ብዛት (በቁጥር)",
    "ቃል የተገባ የአክስዮን ብዛት (በፊደል)",
    "የአክሲዮኖች ድምር ዋጋ",
  ];
  let shareBuyInfoVals = [];
  await ctx.reply(
    "የአክስዮን ግዥ መረጃዎች \n እያንዳንዱ አክስዮን መሸጫ መደበኛ ዋጋ (Par value) ብር 1000.00 (አንድ ሺህ ብር) ነው"
  );
  for await (const info of shareBuyInfo) {
    await ctx.reply(info, {
      reply_markup: terminateKeyboard,
    });
    const shareBuyInfoVal = (await conversation.waitFor(":text")).message
      ?.text as string;
    shareBuyInfoVals.push(shareBuyInfoVal);
  }

  await ctx.reply("የአክስዮን ግዥ አከፋፈል ሁኔታ", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "ይህ ስምምነት እንደተፈረመ የጠቅላላ አክሲዮኖች ዋጋ ሙሉ ለመክፈል ተስማምቻለሁ",
            callback_data: "ሙሉ",
          },
        ],
        [
          {
            text: "ይህ ስምምነት እንደተፈረመ የመጀመሪያ ክፍያ (50 በመቶ) የመጀመሪያውን ክፍያ በተከፈለ እስከ 6 ወር ጊዜ ውስጥ አጠናቅቄ ለመክፈል ተስማምቻለሁ",
            callback_data: "ግማሽ",
          },
        ],
      ],
    },
  });

  let paymentOption = (await conversation.waitFor("callback_query:data"))
    .callbackQuery.data;

  await ctx.reply("የአገልግሎት ክፍያ", {
    reply_markup: terminateKeyboard,
  });
  const serviceCharge = (await conversation.waitFor(":text")).message
    ?.text as string;
  if (serviceCharge === "ማቋረጥ") {
    return;
  }
  //TODO: INCLUDE IN FORM ይህን የአክሲዮን መግዣ ቅፅ እንደተሞላ ከመጀመሪያ ክፍያ ጋር ሙሉ በሙሉ ለመክፈል ተስማምቻለው፡፡

  let concludeInfo = [
    "የአክሲዮን ገዢው /የተወካይ/ ስም",
    "አክሲዮን የተገዛበት ቀን",
    "ስለ አክሲዮን ሽያጩ ከማን/ከየት ሰሙ ?",
    "በማን አስታዋሽነት ገዙ ? ",
  ];
  let concludeInfoVals = [];
  await ctx.reply("ማጠቃለያ");
  for await (const info of concludeInfo) {
    await ctx.reply(info);
    const concludeInfoVal = (await conversation.waitFor(":text")).message
      ?.text as string;
    concludeInfoVals.push(concludeInfoVal);
  }

  let imges = [
    "የታደሰ መታወቂያ/መንጃ ፈቃድ/ፓስፖርት \n የታደሰ መታወቂያ/መንጃ ፈቃድ/ፓስፖርት ኮፒ እዚህ ጋር ያያይዙ",
    "ትውልደ ኢትዮጵያዊነትን ማረጋገጫ ሰነድ (Yellow card)",
    "የባንክ ደረሰኝ * \n ባንክ ያስገቡበትን ደረሰኝ እዚህ ጋር ያያይዙ",
    "የውክልና ማስረጃ \n የሚሞላው በወኪል ከሆነ ሕጋዊ የውክልና ማስረጃዎትን እዚህ ጋር ያያይዙ",
    "ፊርማ \n ስካን የተደረገ ወይም በካሜራ የተነሳ ፊርማ እዚህ ጋር ያያይዙ",
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
      [companyInfo, companyVals],
      [representative, representativeInfoVals],
      [shareBuyInfo, shareBuyInfoVals],
      [["የአክስዮን ግዥ አከፋፈል ሁኔታ"], [paymentOption]],
      [["የአገልግሎት ክፍያ"], [serviceCharge]],
      [concludeInfo, concludeInfoVals],
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
            text: "yes",
          },
        ],
        [
          {
            callback_data: "NO",
            text: "No",
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
