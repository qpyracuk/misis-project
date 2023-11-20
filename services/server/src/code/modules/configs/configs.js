
import sslConfigs from "./ssl.js";
import rateLimit from "./rate-limit.js";
import logsConfig from "./logs.js";
import configsDB from "./db.js";

export default {
  ssl: sslConfigs,
  rateLimit: rateLimit,
  logs: logsConfig,
  db: configsDB,
};

