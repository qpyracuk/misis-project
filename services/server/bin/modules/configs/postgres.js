const secret = "ФиОлЕтОвЫе ПигАлИцЫ гРиГоРиАнСкИй СеГоДнЯ";
export default {
  configs: {
    user: process.env.POSTGRES_DB_USER,
    host: process.env.POSTGRES_DB_HOSTNAME,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    port: process.env.POSTGRES_DB_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  hash: {
    secret: secret,
    algorithm: "sha512",
  },
}
console.log({
  configs: {
    user: process.env.POSTGRES_DB_USER,
    host: process.env.POSTGRES_DB_HOSTNAME,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    port: process.env.POSTGRES_DB_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  hash: {
    secret: secret,
    algorithm: "sha512",
  },
});

