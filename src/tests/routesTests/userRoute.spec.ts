import supertest from 'supertest';
import app from '../../server';
import { SUser, User, userClass } from '../../models/user.model';
import { createTestUser } from '../../middleware/creatTestUser';

let testUser: User;

const newUserClass = new userClass();

describe('User Routes', () => {
  let targetId: number;

  beforeAll(async () => {
    await newUserClass.deleteAll();
    testUser = await createTestUser();
  });

  it('[post] create user', async () => {
    const res = await supertest(app)
      .post('/users/create')
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      })
      .send({
        name: 'kirollos',
        password: 'ABcd1234',
        email: 'kero1@gmail.com',
        address: '123 street city'
      });
    targetId = res.body.user.id as unknown as number;
    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe('kirollos');
    expect(res.body.user.email).toBe('kero1@gmail.com');
    expect(res.body.user.address).toBe('123 street city');
    expect(res.body.user.password).not.toBe('ABcd1234');
  });

  it('[get] show user', async () => {
    const res = await supertest(app)
      .get(`/users/show/${targetId}`)
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      });
    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe('kirollos');
    expect(res.body.user.email).toBe('kero1@gmail.com');
    expect(res.body.user.address).toBe('123 street city');
    expect(res.body.user.password).not.toBe('ABcd1234');
  });

  it('[get] index user', async () => {
    const res = await supertest(app)
      .get('/users/index')
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      });
    expect(res.status).toBe(200);
    expect(res.body.users.length).toBe(2);
    expect(res.body.users[1].name).toBe('kirollos');
    expect(res.body.users[1].email).toBe('kero1@gmail.com');
    expect(res.body.users[1].address).toBe('123 street city');
    expect(res.body.users[1].password).not.toBe('ABcd1234');
  });

  it('[put] update user', async () => {
    const res = await supertest(app)
      .put(`/users/update/${targetId}`)
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      })
      .send({
        name: 'updated name',
        password: 'ABcd1234',
        email: 'kero1@gmail.com',
        address: '123 street city'
      });
    expect(res.status).toBe(200);
    expect(res.body.user.name).toBe('updated name');
  });

  it('[delete] delete user', async () => {
    const res = await supertest(app)
      .delete(`/users/delete/${targetId}`)
      .set({
        token: `${testUser.token}`,
        'Content-Type': 'application/json'
      });
    expect(res.status).toBe(200);
  });
});
