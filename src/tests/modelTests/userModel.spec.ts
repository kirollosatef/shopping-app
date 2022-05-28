import { SUser, userClass } from '../../models/user.model';

const newUserClass = new userClass();

const user: SUser = {
  name: 'kirollos',
  password: 'ABcd1234',
  email: 'kiro@gmail.com',
  address: '123 street city'
};

describe('User Model', () => {
  it('should have index method', async () => {
    expect(newUserClass.index).toBeDefined();
  });

  it('should have show method', async () => {
    expect(newUserClass.show).toBeDefined();
  });

  it('should have create method', async () => {
    expect(newUserClass.create).toBeDefined();
  });

  it('should have update method', async () => {
    expect(newUserClass.update).toBeDefined();
  });

  it('should have delete method', async () => {
    expect(newUserClass.destroy).toBeDefined();
  });

  it('should have outh method', async () => {
    expect(newUserClass.login).toBeDefined();
  });
  let userId: number;
  it('should create user', async () => {
    let data = await newUserClass.create(user);
    userId = data.id as unknown as number;
    expect(data.address).toEqual(user.address);
    expect(data.email).toEqual(user.email);
    expect(data.name).toEqual(user.name);
    expect(data.password).not.toEqual(user.password);
  });

  it('should show user', async () => {
    let data = await newUserClass.show(userId);
    expect(data.address).toEqual(user.address);
    expect(data.email).toEqual(user.email);
    expect(data.name).toEqual(user.name);
    expect(data.password).not.toEqual(user.password);
  });

  it('should update user', async () => {
    let data = await newUserClass.update(userId, user);
    expect(data.address).toEqual(user.address);
    expect(data.email).toEqual(user.email);
    expect(data.name).toEqual(user.name);
    expect(data.password).not.toEqual(user.password);
  });

  it('should login user', async () => {
    let data = await newUserClass.login(user.email, user.password);
    expect(data).not.toEqual(null);
  });

  it('should delete user', async () => {
    let data = await newUserClass.destroy(userId);
    expect(data.address).toEqual(user.address);
    expect(data.email).toEqual(user.email);
    expect(data.name).toEqual(user.name);
    expect(data.password).not.toEqual(user.password);
  });
});
