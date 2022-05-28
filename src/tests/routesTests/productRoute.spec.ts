import supertest from 'supertest';
import app from '../../server';
import { FProduct, productClass } from '../../models/product.model';

const newProductClass = new productClass();

const product: FProduct = {
  name: 'Product 1',
  price: 100
};

describe('Product Routes', () => {
  let productId: number;

  beforeAll(async () => {
    newProductClass.deleteAll();
    let date = await newProductClass.create(product);
    productId = date.id as unknown as number;
  });
  it('should create product', async () => {
    const res = await supertest(app).post('/api/products').send(product);
    expect(res.status).toBe(201);
  });

  it('should update product', async () => {
    const res = await supertest(app).put(`/api/products/${productId}`).send({
      name: 'Product 1',
      price: 100
    });
    expect(res.status).toBe(200);
  });

  it('should delete product', async () => {
    const res = await supertest(app).delete(`/api/products/${productId}`);
    expect(res.status).toBe(200);
  });
});
