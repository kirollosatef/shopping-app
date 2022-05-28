import supertest from 'supertest';
import app from '../../server';
import { UserOrder, orderClass } from '../../models/order.model';

let newOrderClass = new orderClass();

const order: UserOrder = {
  userid: 1,
  status: 'pending',
  products: [
    {
      productid: 1,
      quantity: 4
    }
  ]
};

describe('Order Routes', () => {
  let orderId: number;
  beforeAll(async () => {
    await newOrderClass.deleteAll();
    let date = await newOrderClass.create(order);
    orderId = date.id as unknown as number;
  });
  it('should create order', async () => {
    const res = await supertest(app).post('/api/orders').send(order);
    expect(res.status).toBe(201);
  });

  it('should update order', async () => {
    const res = await supertest(app)
      .put(`/api/orders/${orderId}`)
      .send({
        userid: 1,
        status: 'pending',
        products: [
          {
            productid: 1,
            quantity: 4
          }
        ]
      });
    expect(res.status).toBe(200);
  });

  it('should delete order', async () => {
    const res = await supertest(app).delete(`/api/orders/${orderId}`);
    expect(res.status).toBe(200);
  });
});
