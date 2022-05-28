import { FProduct, productClass } from '../../models/product.model';

const newProductClass = new productClass();

const product: FProduct = {
  name: 'pen',
  price: 10
};

describe('Product Model', () => {
  it('should have index method', () => {
    expect(newProductClass.index).toBeDefined();
  });

  it('should have show method', () => {
    expect(newProductClass.show).toBeDefined();
  });

  it('should have create method', () => {
    expect(newProductClass.create).toBeDefined();
  });

  it('should have update method', () => {
    expect(newProductClass.update).toBeDefined();
  });

  it('should have delete method', () => {
    expect(newProductClass.destroy).toBeDefined();
  });
  let productId: number;
  it('should create a product', async () => {
    const data = await newProductClass.create(product);
    productId = data.id as unknown as number;
    expect(data.name).toBe(product.name);
    expect(data.price).toBe(product.price);
  });

  it('should show a product', async () => {
    const data = await newProductClass.show(productId);
    expect(data.name).toBe('pen');
    expect(data.price).toBe(10);
  });

  it('should update a product', async () => {
    const data = await newProductClass.update(productId, product);
    expect(data.name).toBe(product.name);
    expect(data.price).toBe(product.price);
  });

  it('should delete a product', async () => {
    const data = await newProductClass.destroy(productId);
    expect(data.name).toBe(product.name);
    expect(data.price).toBe(product.price);
  });
});
