import rateLimit from "./rate-limit.js";
import postgresDB from "./postgres.js";
// import redisDB from "./redis.js";

export default {
  rateLimit: rateLimit,
  postgres: postgresDB,
  // redis: redisDB,
};

