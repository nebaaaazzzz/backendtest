import {
  InputMediaAudio,
  InputMediaDocument,
  InputMediaPhoto,
  InputMediaVideo,
  PhotoSize,
} from "grammy/types";

type Media = readonly (
  | InputMediaAudio
  | InputMediaDocument
  | InputMediaPhoto
  | InputMediaVideo
)[];

export function buildMessage(input: any[], imgs: PhotoSize[][]): Media {
  let message = "";
  input.forEach(([keyArray, valueArray]) => {
    for (let i = 0; i < keyArray.length; i++) {
      message += `<b>${keyArray[i]}</b>   : ${valueArray[i]}\n`;
    }
    message += "\n";
  });
  let resArray: any = [];
  imgs.forEach((item, index) => {
    if (index == 0) {
      resArray.push({
        caption: message,
        parse_mode: "HTML",
        type: "photo",
        media: item[0].file_id,
      });
    } else {
      resArray.push({
        type: "photo",
        parse_mode: "HTML",
        media: item[0].file_id,
      });
    }
  });
  return resArray;
}
