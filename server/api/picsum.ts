export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  const url = query.url as string;

  if (!url) return event.res.end("url error");

  const response = await $fetch.raw(`${url}?random=${Math.random()}`, {
    responseType: "arrayBuffer",
  });

  const contentType = response.headers.get("Content-Type") || "image/png";

  send(event, Buffer.from(response._data as ArrayBuffer), contentType);
});
