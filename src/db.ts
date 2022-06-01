import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_NAME_TEST, DB_USER, DB_PASSWORD, ENV } =
  process.env;

let data;

if (ENV === 'dev') {
  data = {
    host: DB_HOST,
    database: DB_NAME,
    port: DB_PORT as unknown as number,
    user: DB_USER,
    password: DB_PASSWORD
  };
}

if (ENV === 'test') {
  data = {
    host: DB_HOST,
    database: DB_NAME_TEST,
    port: DB_PORT as unknown as number,
    user: DB_USER,
    password: DB_PASSWORD
  };
}

const DBInfo = new Pool(data);

export default DBInfo;
