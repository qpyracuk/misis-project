import { createClient } from "redis";
const redis = createClient({
	url: `redis://default:${process.env.CACHE_DB_PASSWORD}@${process.env.CACHE_DB_HOSTNAME}:${process.env.CACHE_DB_PORT}`,
});

redis.on("connect", (e) => {
	console.log("| REDIS CONNECTED |");
});
await redis.connect();




export default async function linkRedirect(shortUrl) {
  return await redis.get(shortUrl) ?? false
}
