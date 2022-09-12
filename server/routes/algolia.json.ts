import { serverQueryContent } from "#content/server";

export default defineEventHandler(async (event) => {
  const docs = await serverQueryContent(event).find();

  return docs
    .map((item) => {
      item.objectID = item._id;
      if (item._extension?.endsWith("yml")) {
        item.previews = item.previews.map((img: string) => {
          return `https://imagedelivery.net/C1c8i0JtRURCOUA0iRLBpQ/wcao${item._path?.replace(
            /\//g,
            "-"
          )}-${img.split(".")[0].replace("/", "")}/sm`;
        });
      }
      return item;
    })
    .filter((item) => item._extension?.endsWith("yml"));
});
