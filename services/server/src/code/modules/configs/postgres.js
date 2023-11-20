const secret = "ФиОлЕтОвЫе ПигАлИцЫ гРиГоРиАнСкИй СеГоДнЯ";
export default {
  configs: {
    user: process.env.POSTGRESS_DB_USER,
    host: process.env.POSTGRESS_DB_HOSTNAME,
    database: process.env.POSTGRESS_DB_NAME,
    password: process.env.POSTGRESS_DB_PASSWORD,
    port: process.env.POSTGRESS_DB_PORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  hash: {
    secret: secret,
    algorithm: "sha512",
  },
}

