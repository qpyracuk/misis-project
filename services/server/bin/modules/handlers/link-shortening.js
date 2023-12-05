import DewartPG from "dewart-pg";
import configs from "../configs/configs.js";
import symbols from "../data/all-symbols.js";
const symbolsLength = symbols.length;
import { createClient } from "redis";
const redis = createClient({
	url: `redis://default:${process.env.CACHE_DB_PASSWORD}@${process.env.CACHE_DB_HOSTNAME}:${process.env.CACHE_DB_PORT}`,
});

redis.on("connect", (e) => {
	console.log("| REDIS CONNECTED |");
});
await redis.connect();
const pg = new DewartPG(configs.postgres);

pg.query("SELECT NOW()", [], () => {
	console.log("| POSTGRES WEB CONNECTED |");
});

function generateLink(value) {
	let shortUrl = "";
	do {
		shortUrl += symbols[value % symbolsLength];
		value = Math.floor(value / symbolsLength);
	} while (value);
	return shortUrl;
}

export default async function linkShortening(longUrl, callback) {
  const savedUrl = await redis.get(longUrl);
  if (savedUrl ?? false) return callback(savedUrl);
	const counter = Number.parseInt((await redis.get("counter")) ?? 0);
	const shortUrl = `/rd/${generateLink(counter)}`;
	redis.set("counter", counter + 1);
	redis.set(shortUrl, longUrl);
	pg.query("INSERT INTO url (url_short, url_long) VALUES ($1, $2)", [shortUrl, longUrl], () => {
    callback(shortUrl);
	})
	
}
