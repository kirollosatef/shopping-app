import DBInfo from "../db";

export interface OrderProduct {
  productId: number;
  quantity: number;
}

export interface UserOrder {
  products: OrderProduct[];
  userId: number;
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
      const OrderProductSql = `SELECT productId,quantity FROM order_products WHERE orderId = $1`;
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
      const OrderProductSql = `SELECT productId,quantity FROM order_products WHERE orderId = $1`;
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
      const sql = `INSERT INTO orders (userId, status) VALUES ($1, $2) RETURNING *`;
      const result = await db.query(sql, [order.userId, order.status]);
      const orderId = result.rows[0].id;
      const OrderProductSql = `INSERT INTO order_products (orderId, productId, quantity) VALUES ($1, $2, $3)`;
      for (const product of order.products) {
        await db.query(OrderProductSql, [
          orderId,
          product.productId,
          product.quantity,
        ]);
      }
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, order: UserOrder): Promise<Order> {
    try {
      const db = await DBInfo.connect();
      const sql = `UPDATE orders SET userId = $1, status = $2 WHERE id = $3 RETURNING *`;
      const result = await db.query(sql, [order.userId, order.status, id]);
      const orderId = result.rows[0].id;
      const OrderProductSql = `UPDATE order_products SET productId = $1, quantity = $2 WHERE orderId = $3`;
      for (const product of order.products) {
        await db.query(OrderProductSql, [
          product.productId,
          product.quantity,
          orderId,
        ]);
      }
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  async destroy(id: number): Promise<Order> {
    try {
      const db = await DBInfo.connect();
      const orderProductSql = `DELETE FROM order_products WHERE orderId = $1`;
      await db.query(orderProductSql, [id]);
      const sql = `DELETE FROM orders WHERE id = $1 RETURNING *`;
      const result = await db.query(sql, [id]);
      db.release();
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }
}
