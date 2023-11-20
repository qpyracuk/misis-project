import redis from "redis";
import pg from "dewart-pg";
import configs from "../configs/configs.js";
import symbols from "../data/all-symbols.js";
const symbolsLength = symbols.length;

const pg = new DewartPG(configs.postgres);

pg.query("SELECT NOW()", [], () => {
  console.log("| POSTGRES WEB CONNECTED |");
})

function generateLink(value) {
	let shortUrl = "";
	do {
		shortUrl += symbols[value % symbolsLength];
    value = Math.floor(value / symbolsLength);
	} while (value);
	return shortUrl
}

export default async function linkShortening(longUrl, callback) {
  const counter = await redis.get("counter") ?? 0;
  const shortUrl = generateLink(counter)
  redis.set("counter", counter + 1)
  redis.set(shortUrl, longUrl)
  pg.query("INSERT INTO url (url_short, url_long) VALUES ($1, $2)", [shortUrl, longUrl], callback)
}