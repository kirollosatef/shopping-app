import bcrybt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import DBInfo from '../db';

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;

export interface FUser {
  name: string;
  address: string;
}

export interface SUser extends FUser {
  email: string;
  password: string;
}

export interface User extends SUser {
  id?: number;
  token?: string;
}

export class userClass {
  async index(): Promise<User[]> {
    try {
      const db = await DBInfo.connect();
      const sql = `SELECT * FROM users`;
      const result = await db.query(sql);
      db.release();
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  async create(user: SUser): Promise<User> {
    try {
      const db = await DBInfo.connect();
      const sql = `INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4) RETURNING *`;
      const hashedPassword = await bcrybt.hash(
        user.password + BCRYPT_PASSWORD,
        Number(SALT_ROUNDS)
      );
      const values = [user.name, user.email, hashedPassword, user.address];
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
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, user: SUser): Promise<User> {
    try {
      const db = await DBInfo.connect();
      const sql = `UPDATE users SET name = $1, email = $2, password = $3, address = $4 WHERE id = $5 RETURNING *`;
      const hashedPassword = await bcrybt.hash(
        user.password + BCRYPT_PASSWORD,
        Number(SALT_ROUNDS)
      );
      const values = [user.name, user.email, hashedPassword, user.address, id];
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

  async deleteAll(): Promise<void> {
    try {
      const db = await DBInfo.connect();
      const sql1 = `DELETE FROM orders_products`;
      await db.query(sql1);
      const sql2 = `DELETE FROM orders`;
      await db.query(sql2);
      const sql3 = `DELETE FROM users`;
      await db.query(sql3);
      const sql4 = `DELETE FROM products`;
      await db.query(sql4);
      db.release();
    } catch (err) {
      throw err;
    }
  }
}
