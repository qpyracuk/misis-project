import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import linkShortening from "./modules/handlers/link-shortening.js";
import linkRedirect from "./modules/handlers/link-redirect.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("*", async (req, res) => {
	console.log(req.url);
	const redirectUrl = await linkRedirect(req.url);
	if (redirectUrl) {
		console.log("РЕДИРЕКТ", redirectUrl);
		res.status(301).redirect(redirectUrl);
	}
});

app.post("/reduce", async (req, res) => {
	const regExpUrl =
		/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;

	const url = req.body.url;
	if (regExpUrl.test(url)) {
		linkShortening(url, (response) => {
			res.send(JSON.stringify({ type: "correct", url: `http://${process.env.DOMAIN}${response}` }));
		});
	} else {
		res.send(JSON.stringify({ type: "error", url: "Not url" }));
	}
});
//СОЗДАНИЕ СЕРВЕРОВ
http.createServer(app).listen(13370);
// https.createServer(configs.ssl, app).listen(process.env.HTTPS_PORT);

console.log(process.env.REST_HTTP_PORT);
export default function () {
	console.log("SERVER RUNNING");
}
