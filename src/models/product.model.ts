import DBInfo from '../db';

export interface FProduct {
  name: string;
  price: number;
}

export interface Product extends FProduct {
  id: number;
}

export class productClass {
  async index(): Promise<Product[]> {
    try {
      const db = await DBInfo.connect();
      const sql = `SELECT * FROM products`;
      const result = await db.query(sql);
      db.release();
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const db = await DBInfo.connect();
      const sql = `SELECT * FROM products WHERE id = $1`;
      const values = [id];
      const result = await db.query(sql, values);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async create(product: FProduct): Promise<Product> {
    try {
      const db = await DBInfo.connect();
      const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`;
      const values = [product.name, product.price];
      const result = await db.query(sql, values);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, product: FProduct): Promise<Product> {
    try {
      const db = await DBInfo.connect();
      const sql = `UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *`;
      const values = [product.name, product.price, id];
      const result = await db.query(sql, values);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async destroy(id: number): Promise<Product> {
    try {
      const db = await DBInfo.connect();
      const sql = `DELETE FROM products WHERE id = $1 RETURNING *`;
      const values = [id];
      const result = await db.query(sql, values);
      db.release();
      return result.rows[0];
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
    } catch (err) {
      throw err;
    }
  }
}
