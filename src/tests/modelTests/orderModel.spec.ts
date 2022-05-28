import { UserOrder, orderClass } from '../../models/order.model';
import { FProduct, productClass } from '../../models/product.model';
import { SUser, userClass } from '../../models/user.model';

const newOrderClass = new orderClass();

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

const newProductClass = new productClass();
const product: FProduct = {
  name: 'pen',
  price: 10
};

const newUserClass = new userClass();
const user: SUser = {
  name: 'kirollos',
  password: 'ABcd1234',
  email: 'kiro@gmail.com',
  address: '123 street city'
};

describe('Order Model', () => {
  it('should have index method', () => {
    expect(newOrderClass.index).toBeDefined();
  });

  it('should have show method', () => {
    expect(newOrderClass.show).toBeDefined();
  });

  it('should have create method', () => {
    expect(newOrderClass.create).toBeDefined();
  });

  it('should have update method', () => {
    expect(newOrderClass.update).toBeDefined();
  });

  it('should have delete method', () => {
    expect(newOrderClass.destroy).toBeDefined();
  });

  let orderId: number;
  let productId: number;
  let userId: number;
  it('should crate order', async () => {
    const userData = await newUserClass.create(user);
    userId = userData.id as unknown as number;
    const productData = await newProductClass.create(product);
    productId = productData.id as unknown as number;
    order.userid = userId;
    order.products = [
      {
        productid: productId,
        quantity: 4
      }
    ];
    let data = await newOrderClass.create(order);
    orderId = data.id as unknown as number;
    expect(data.userid).toEqual(order.userid);
    expect(data.status).toEqual(order.status);
    expect(data.products).toEqual(order.products);
  });

  it('should show order', async () => {
    order.userid = userId;
    order.products = [
      {
        productid: productId,
        quantity: 4
      }
    ];
    let data = await newOrderClass.show(orderId);
    expect(data.userid).toEqual(order.userid);
    expect(data.status).toEqual(order.status);
    expect(data.products).toEqual(order.products);
  });

  it('should update order', async () => {
    order.userid = userId;
    order.products = [
      {
        productid: productId,
        quantity: 4
      }
    ];
    let data = await newOrderClass.update(orderId, order);
    expect(data.userid).toEqual(order.userid);
    expect(data.status).toEqual(order.status);
    expect(data.products).toEqual(order.products);
  });

  it('should delete order', async () => {
    order.userid = userId;
    order.products = [
      {
        productid: productId,
        quantity: 4
      }
    ];
    let data = await newOrderClass.destroy(orderId);
    expect(data.userid).toEqual(order.userid);
    expect(data.status).toEqual(order.status);
  });
});
