import express from "express";
import http from "http";
import https from "https";
import cors from "cors";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import linkShortening from "./modules/handlers/link-shortening.js";
import configs from "./modules/configs/configs.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((error, req, res, next) => {
	res.status(400);
	res.json();
});
app.use(rateLimit(configs.rateLimit));

/**Обрабатывает данные из формы*/
app.put("/reduce", (req, res) => {
  console.log(req);
});

app.get("/connection", (req, res) => {
	res.send(JSON.stringify({connect: true}));
});

//СОЗДАНИЕ СЕРВЕРОВ
http.createServer(app).listen(process.env.REST_HTTP_PORT);
// https.createServer(configs.ssl, app).listen(process.env.HTTPS_PORT);


export default function () {
  console.log("SERVER RUNNING");
}