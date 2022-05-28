import supertest from 'supertest';
import app from '../../server';
import { SUser, userClass } from '../../models/user.model';

const newUserClass = new userClass();

const user: SUser = {
  name: 'kirollos',
  password: 'ABcd1234',
  email: 'kero@gmail.com',
  address: '123 street city'
};

describe('User Routes', () => {
  let targetId: number;
  beforeAll(async () => {
    await newUserClass.deleteAll();
    let data = await newUserClass.create(user);
    targetId = data.id as unknown as number;
  });

  it('[post] create user DONE!! returns 200', async () => {
    const res = await supertest(app).post('/users/create').send({
      name: 'kirollos',
      password: 'ABcd1234',
      email: 'kero1@gmail.com',
      address: '123 street city'
    });
    expect(res.status).toBe(200);
  });

  it('[get] show user DONE!! returns 200', async () => {
    const res = await supertest(app).get(`/users/${targetId}`);
    expect(res.status).toBe(200);
  });

  it('[put] update user DONE!! returns 200', async () => {
    const res = await supertest(app).put(`users/update/${targetId}`).send({
      name: 'kirollos',
      password: 'ABcd1234',
      email: 'kero3@gmail.com',
      address: '123 street city'
    });
    expect(res.status).toBe(200);
  });

  it('[delete] delete user DONE!! returns 200', async () => {
    const res = await supertest(app).delete(`/users/delete/${targetId}`);
    expect(res.status).toBe(200);
  });
});
