export default defineEventHandler(async (event) => {
  const query = useQuery(event);

  const response = await $fetch.raw(query.url + `?t=${Math.random()}`, {
    responseType: "arrayBuffer",
  });

  const contentType = response.headers.get("Content-Type") || "image/jpeg";

  return send(event, Buffer.from(response._data as ArrayBuffer), contentType);
});
