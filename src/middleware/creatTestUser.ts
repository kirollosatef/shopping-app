import { SUser, User, userClass } from '../models/user.model';
import { FProduct , Product, productClass } from '../models/product.model';

export const createTestUser = async (): Promise<User> => {
  const newUserClass = new userClass();
  const user: SUser = {
    name: 'kirollos',
    password: 'ABcd1234',
    email: 'test@test.com',
    address: '123 street city'
  };
  let data = await newUserClass.create(user);
  return data;
};

export const createTestProduct = async (): Promise<Product> => {
  const newProductClass = new productClass();
  const product: FProduct = {
    name: 'Product 1',
    price: 100
  };
  let data = await newProductClass.create(product);
  return data;
}

