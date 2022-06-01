import supertest from 'supertest';
import app from '../../server';
import { productClass } from '../../models/product.model';
import { createTestUser } from '../../middleware/creatTestUser';
import { User } from '../../models/user.model';

let testUser: User;

const newProductClass = new productClass();

describe('Product Routes', () => {
  let productId: number;

  beforeAll(async () => {
    await newProductClass.deleteAll();
    testUser = await createTestUser();
  });

  it('[post] create product', async () => {
    const res = await supertest(app)
      .post('/products/create')
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      })
      .send({
        name: 'Product 1',
        price: 100
      });
    productId = res.body.product.id as unknown as number;
    expect(res.status).toBe(200);
    expect(res.body.product.name).toBe('Product 1');
    expect(res.body.product.price).toBe(100);
  });

  it('[get] index product', async () => {
    const res = await supertest(app)
      .get('/products/index')
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      });
    expect(res.status).toBe(200);
    expect(res.body.products.length).toBe(1);
    expect(res.body.products[0].name).toBe('Product 1');
    expect(res.body.products[0].price).toBe(100);
  });

  it('[get] show product', async () => {
    const res = await supertest(app)
      .get(`/products/show/${productId}`)
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      });
    expect(res.status).toBe(200);
    expect(res.body.product.name).toBe('Product 1');
    expect(res.body.product.price).toBe(100);
  });

  it('[put] update product', async () => {
    const res = await supertest(app)
      .put(`/products/update/${productId}`)
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      })
      .send({
        name: 'update 1',
        price: 100
      });
    expect(res.status).toBe(200);
    expect(res.body.product.name).toBe('update 1');
    expect(res.body.product.price).toBe(100);
  });

  it('[delete] delete product', async () => {
    const res = await supertest(app)
      .delete(`/products/delete/${productId}`)
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      });
    expect(res.status).toBe(200);
  });
});
