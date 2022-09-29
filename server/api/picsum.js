export default defineEventHandler(async (event) => {
  const query = useQuery(event);

  const response = await $fetch.raw(query.url, {
    responseType: "arrayBuffer",
  });

  const contentType = response.headers.get("Content-Type");

  send(event, Buffer.from(response._data), contentType);
});
