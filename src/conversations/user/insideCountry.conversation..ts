import { PhotoSize } from "grammy/types";
import { MyContext, MyConversation } from "../../types";
import { buildMessage } from "@src/utils/user/message";
import { User } from "@src/entity/user";
import { mainMenu, terminateKeyboard } from "@src/components/keyboards";
import bot from "@src/config/botConfig";
import { ADMIN_TELEGRAM_ID } from "@src/config/constants";
export async function insideCountryConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  let personalInfo = [
    "ስም እስከ አያት",
    "Full name in English",
    // "አድራሻ",
    "ክልል",
    "ከተማ",
    "ክ/ከተማ",
    "ወረዳ",
    "ቀበሌ",
    "የቤት ቁጥር",
    "ፖ.ሣ.ቁ.  (ካለዎት)",
    "ስልክ / ሞባይል",
    "የግብር ከፋይ መለያ ቁጥር", //TODO: SKIP
    "ኢሜል",
    "የመታወቂያ ቁጥር",
  ];
  let personalInfoVals = [];
  await ctx.reply("በግለሰብ የሚሞላ");
  for await (const info of personalInfo) {
    // if (info === "አድራሻ") {
    //   await ctx.reply(info);
    //   continue;
    // }
    await ctx.reply(info, {
      reply_markup: terminateKeyboard,
    });
    const personalInfoVal = (await conversation.waitFor(":text")).message
      ?.text as string;
    personalInfoVals.push(personalInfoVal);
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
    "ፋክስ",
    "ኢሜል",
  ];
  let representativeInfoVals = [];
  await ctx.reply("የግለሰብ ተወካይ መረጃ");
  for await (const info of representative) {
    await ctx.reply(info, {
      reply_markup: terminateKeyboard,
    });
    const representativeInfoVal = (await conversation.waitFor(":text")).message
      ?.text as string;
    if (representativeInfoVal === "ማቋረጥ") {
      return;
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
      [personalInfo, personalInfoVals],
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
    await bot.api.sendMediaGroup(
      ADMIN_TELEGRAM_ID,
      buildMessage(toStore.data, toStore.images)
    );
    ctx.reply("በተሳካ ሁኔታ ገብቷል።", {
      reply_markup: mainMenu,
    });
  } else {
    ctx.reply("ተጥሏል።", {
      reply_markup: mainMenu,
    });
  }
}
