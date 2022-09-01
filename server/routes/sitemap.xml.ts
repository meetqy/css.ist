import { SitemapStream, streamToPromise } from "sitemap";
import { serverQueryContent } from "#content/server";

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find();
  const sitemap = new SitemapStream({
    hostname: "https://wcao.cc",
  });

  const allTags: string[] = [];

  // introduce
  for (const doc of docs) {
    if (!doc.tags) {
      continue;
    }
    (doc.tags as string[]).forEach((item) => {
      if (!allTags.includes(item)) {
        allTags.push(item);
        sitemap.write({
          url: "/tag/" + item,
          changefreq: "monthly",
        });
      }
    });

    sitemap.write({
      url: doc._path,
      changefreq: "monthly",
    });

    sitemap.write({
      url: doc._path?.replace("introduce", "template"),
      changefreq: "monthly",
    });
  }

  sitemap.end();

  return streamToPromise(sitemap);
});
