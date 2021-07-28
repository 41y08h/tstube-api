import { Pool } from "pg";

const db = new Pool({
  user: "postgres",
  password: "pass",
  database: "tstube",
});

export default db;
