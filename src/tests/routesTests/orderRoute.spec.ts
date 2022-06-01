import { Product } from './../../models/product.model';
import supertest from 'supertest';
import app from '../../server';
import { orderClass } from '../../models/order.model';
import {
  createTestUser,
  createTestProduct
} from '../../middleware/creatTestUser';
import { User } from '../../models/user.model';

let testUser: User;
let testProduct: Product;

const newOrderClass = new orderClass();

describe('Order Routes', () => {
  let orderId: number;

  beforeAll(async () => {
    await newOrderClass.deleteAll();
    testUser = await createTestUser();
    testProduct = await createTestProduct();
  });

  it('[post] create order', async () => {
    const res = await supertest(app)
      .post('/orders/create')
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      })
      .send({
        userid: testUser.id,
        products: [
          {
            productid: testProduct.id,
            quantity: 4
          }
        ],
        status: 'pending'
      });
    orderId = res.body.order.id as unknown as number;
    expect(res.status).toBe(200);
    expect(res.body.order.status).toBe('pending');
    expect(res.body.order.products[0].productid).toBe(testProduct.id);
    expect(res.body.order.products[0].quantity).toBe(4);
  });

  it('[get] index order', async () => {
    const res = await supertest(app)
      .get('/orders/index')
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      });
    expect(res.status).toBe(200);
    expect(res.body.orders.length).toBe(1);
    expect(res.body.orders[0].status).toBe('pending');
    expect(res.body.orders[0].products[0].productid).toBe(testProduct.id);
    expect(res.body.orders[0].products[0].quantity).toBe(4);
  });

  it('[get] show order', async () => {
    const res = await supertest(app)
      .get(`/orders/show/${orderId}`)
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      });
    expect(res.status).toBe(200);
    expect(res.body.order.status).toBe('pending');
    expect(res.body.order.products[0].productid).toBe(testProduct.id);
    expect(res.body.order.products[0].quantity).toBe(4);
  });

  it('[put] update order', async () => {
    const res = await supertest(app)
      .put(`/orders/update/${orderId}`)
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      })
      .send({
        userid: testUser.id,
        products: [
          {
            productid: testProduct.id,
            quantity: 4
          }
        ],
        status: 'done'
      });
    expect(res.status).toBe(200);
    expect(res.body.order.status).toBe('done');
  });

  it('[delete] delete order', async () => {
    const res = await supertest(app)
      .delete(`/orders/delete/${orderId}`)
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      });
    expect(res.status).toBe(200);
  });
});
