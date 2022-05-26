import bcrybt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import DBInfo from "../db";

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;

export interface FAddress {
  streetNumber: number;
  streetName: string;
  city: string;
}

export interface Address extends FAddress {
  id: number;
}

export interface FUser extends FAddress {
  name: string;
}

export interface SUser extends FUser {
  email: string;
  password: string;
}

export interface User extends FUser {
  id: number;
  token: string;
}

export class userClass {
  async index(): Promise<User[]> {
    try {
      const db = await DBInfo.connect();
      const sql = `SELECT * FROM users`;
      const result = await db.query(sql);
      const addressSql = `SELECT * FROM addresses WHERE id = $1`;
      for (const user of result.rows) {
        const addressValues = [user.addressId];
        const addressResult = await db.query(addressSql, addressValues);
        user.address = addressResult.rows[0];
      }
      db.release();
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  async create(user: SUser): Promise<User> {
    try {
      const db = await DBInfo.connect();
      const sql = `INSERT INTO users (name, email, password, addressId) VALUES ($1, $2, $3, $4) RETURNING *`;
      const hashedPassword = await bcrybt.hash(
        user.password + BCRYPT_PASSWORD,
        Number(SALT_ROUNDS)
      );
      const addressSql = `INSERT INTO addresses (streetNumber, streetName, city) VALUES ($1, $2, $3) RETURNING *`;
      const addressResult = await db.query(addressSql, [
        user.streetNumber,
        user.streetName,
        user.city,
      ]);
      const addressId = addressResult.rows[0].id;
      const values = [user.name, user.email, hashedPassword, addressId];
      const result = await db.query(sql, values);
      const token = jwt.sign({ user: result.rows[0] }, TOKEN_SECRET as string);
      db.release();
      result.rows[0].token = token;
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async show(id: number): Promise<User> {
    try {
      const db = await DBInfo.connect();
      const sql = `SELECT * FROM users WHERE id = $1`;
      const values = [id];
      const result = await db.query(sql, values);
      const addressSql = `SELECT * FROM addresses WHERE id = $1`;
      const addressValues = [result.rows[0].addressId];
      const addressResult = await db.query(addressSql, addressValues);
      result.rows[0].address = addressResult.rows[0];
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, user: SUser): Promise<User> {
    try {
      const db = await DBInfo.connect();
      const getIdSql = `SELECT addressId FROM users WHERE id = $1`;
      const getIdResult = await db.query(getIdSql, [id]);
      const deleteAddressSql = `DELETE FROM addresses WHERE id = $1`;
      await db.query(deleteAddressSql, [getIdResult.rows[0]]);
      const sql = `UPDATE users SET name = $1, email = $2, password = $3, addressId = $4 WHERE id = $5 RETURNING *`;
      const hashedPassword = await bcrybt.hash(
        user.password + BCRYPT_PASSWORD,
        Number(SALT_ROUNDS)
      );
      const addressSql = `INSERT INTO addresses (streetNumber, streetName, city) VALUES ($1, $2, $3) RETURNING *`;
      const addressResult = await db.query(addressSql, [
        user.streetNumber,
        user.streetName,
        user.city,
      ]);
      const addressId = addressResult.rows[0].id;
      const values = [user.name, user.email, hashedPassword, addressId, id];
      const result = await db.query(sql, values);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async destroy(id: number): Promise<User> {
    try {
      const db = await DBInfo.connect();
      const getIdSql = `SELECT addressId FROM users WHERE id = $1`;
      const getIdResult = await db.query(getIdSql, [id]);
      const deleteAddressSql = `DELETE FROM addresses WHERE id = $1`;
      await db.query(deleteAddressSql, [getIdResult.rows[0]]);
      const sql = `DELETE FROM users WHERE id = $1 RETURNING *`;
      const values = [id];
      const result = await db.query(sql, values);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const db = await DBInfo.connect();
      const sql = `SELECT * FROM users WHERE email = $1`;
      const values = [email];
      const result = await db.query(sql, values);
      db.release();
      const user = result.rows[0];
      const isValid = await bcrybt.compare(
        password + BCRYPT_PASSWORD,
        user.password
      );
      if (isValid) {
        const token = jwt.sign({ user: user }, TOKEN_SECRET as string);
        user.token = token;
        return user;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
}
