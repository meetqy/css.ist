export default defineEventHandler(async (event) => {
  const query = useQuery(event);

  const response = await $fetch.raw(query.url + `?random=${Math.random()}`, {
    responseType: "arrayBuffer",
  });

  const contentType = response.headers.get("Content-Type");

  return send(event, Buffer.from(response._data), contentType);
});
