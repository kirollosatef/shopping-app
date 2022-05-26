import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { DB_HOST, DB_NAME, DB_TEST_NAME, DB_USER, DB_PASSWORD, ENV } =
  process.env;

let data;

if (ENV === "dev") {
  data = {
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  };
}

if (ENV === "test") {
  data = {
    host: DB_HOST,
    database: DB_TEST_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  };
}

const DBInfo = new Pool(data);

export default DBInfo;
