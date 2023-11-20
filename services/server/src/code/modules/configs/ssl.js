import fs from "fs";
import path from "path";
const pathToSSL = path.join(__dirname, "../", "../", "../", "ssl", process.env.DOMAIN)
export default {
  key: fs.readFileSync(path.join(pathToSSL, "privkey.pem")),
  cert: fs.readFileSync(path.join(pathToSSL, "fullchain.pem"))
};
