import DBInfo from '../db';

export interface OrderProduct {
  productid: number;
  quantity: number;
}

export interface UserOrder {
  products: OrderProduct[];
  userid: number;
  status: string;
}

export interface Order extends UserOrder {
  id: number;
}

export class orderClass {
  async index(): Promise<Order[]> {
    try {
      const db = await DBInfo.connect();
      const sql = `SELECT * FROM orders`;
      const result = await db.query(sql);
      const OrderProductSql = `SELECT productid , quantity FROM orders_products WHERE orderid = $1`;
      for (const order of result.rows) {
        const orderProducts = await db.query(OrderProductSql, [order.id]);
        order.products = orderProducts.rows;
      }
      db.release();
      return result.rows;
    } catch (err) {
      throw err;
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const db = await DBInfo.connect();
      const sql = `SELECT * FROM orders WHERE id = $1`;
      const result = await db.query(sql, [id]);
      const OrderProductSql = `SELECT productid , quantity FROM orders_products WHERE orderid = $1`;
      const orderProducts = await db.query(OrderProductSql, [id]);
      result.rows[0].products = orderProducts.rows;
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async create(order: UserOrder): Promise<Order> {
    try {
      const db = await DBInfo.connect();
      const sql = `INSERT INTO orders (userid, status) VALUES ($1, $2) RETURNING *`;
      const result = await db.query(sql, [order.userid, order.status]);
      const orderId = result.rows[0].id;
      const OrderProductSql = `INSERT INTO orders_products (orderid, productid, quantity) VALUES ($1, $2, $3) `;
      for (const product of order.products) {
        await db.query(OrderProductSql, [
          orderId,
          product.productid,
          product.quantity
        ]);
      }
      result.rows[0].products = order.products;
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, order: UserOrder): Promise<Order> {
    try {
      const db = await DBInfo.connect();
      const sql = `UPDATE orders SET userid = $1, status = $2 WHERE id = $3 RETURNING *`;
      const result = await db.query(sql, [order.userid, order.status, id]);
      const orderId = result.rows[0].id;
      const OrderProductSql = `UPDATE orders_products SET productid = $1, quantity = $2 WHERE orderId = $3`;
      for (const product of order.products) {
        await db.query(OrderProductSql, [
          product.productid,
          product.quantity,
          orderId
        ]);
      }
      result.rows[0].products = order.products;
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async destroy(id: number): Promise<Order> {
    try {
      const db = await DBInfo.connect();
      const OrderProductSql = `DELETE FROM orders_products WHERE orderid = $1 RETURNING *`;
      const orderProduct = await db.query(OrderProductSql, [id]);
      const sql = `DELETE FROM orders WHERE id = $1 RETURNING *`;
      const result = await db.query(sql, [id]);
      result.rows[0].products = orderProduct.rows;
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
