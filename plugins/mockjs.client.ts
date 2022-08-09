import * as Mock from "mockjs";

type language = "zh" | "en";

type Template = { [key in language]: object | string };

export default defineNuxtPlugin(() => {
  return {
    provide: {
      Mock,
      // 标题
      MockTitle: (min?: number | undefined, max?: number | undefined) => {
        return {
          en: Mock.Random.title(min, max),
          zh: Mock.Random.ctitle(min, max),
        };
      },

      // 内容
      MockContent: (min?: number | undefined, max?: number | undefined) => {
        return {
          en: Mock.Random.paragraph(min, max),
          zh: Mock.Random.cparagraph(min, max),
        };
      },

      // 列表
      MockList: (num: number, unsplash?: string[]) => {
        const template: { [key: string]: any } = {};

        template[`en|${num}`] = [
          {
            title: "@title",
            desc: "@sentence",
            content: "@paragraph(1, 12)",
            fav: "@natural(1,999)",
            author: "@name",
            image: () =>
              useUnsplash(
                (unsplash && unsplash[0]) || "/user/feeypflanzen/",
                (unsplash && unsplash[1]) || "500x500"
              ),
            authorAvatar: () => usePicsum("/200/200"),
          },
        ];
        template[`zh|${num}`] = [
          {
            title: "@ctitle",
            desc: "@csentence",
            content: "@cparagraph(1, 12)",
            fav: "@natural(1,999)",
            author: "@cname",
            image: () =>
              useUnsplash(
                (unsplash && unsplash[0]) || "/user/feeypflanzen/",
                (unsplash && unsplash[1]) || "500x500"
              ),
            authorAvatar: () => usePicsum("/200/200"),
          },
        ];

        return Mock.mock(template) as Template;
      },

      // word
      MockWord: (min?: number, max?: number) => {
        return {
          en: Mock.Random.word(min || 1, max || 5),
          zh: Mock.Random.cword(min || 1, max || 2),
        };
      },
    },
  };
});
