const request = require('supertest');
const app = require('../server')
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

// Roles ada admin dan seller
//admin seed
//register auto seller

afterAll(done => {
  queryInterface
    .bulkDelete('Users', {})
    .then(() => done())
    .catch(err => done(err));
});


describe('Register & Login Routes Test', () => {
  describe('POST /register , Create new User', () => {
    test(`Should return status 201 and object of new user`, function (done) {
      const data = {
        name: 'John doe',
        email: 'john@mail.com',
        password: 'john'
      };
      request(app)
        .post('/register')
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('name', data.name);
          expect(body).toHaveProperty('email', data.email);
          expect(body).toHaveProperty('roles', 'admin');
          expect(body).toHaveProperty('password',expect.any(String));
          done();
        })
        .catch(err => {
          done(err)
        });
    })
  })
  describe('Errors when creating new user', () => {
    test('Should send an error - (Empty Body, code: 400)', (done) => {
      const expectedErrors = [
        { message: "Name is required" },
        { message: "Email is required" },
        { message: "Password is required" }
      ]
      request(app)
        .post('/register')
        .send({})
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toEqual(expect.arrayContaining(expectedErrors));
          done();
        });
     })
    test('Should send an error - (Duplicate Email, code: 400)', (done) => {
      const data = {
        name: 'foo bar',
        email: 'john@mail.com',
        password: 'foo'
      };

      request(app)
        .post('/register')
        .send(data)
        .then(response => {
         const { body, status } = response;
         expect(status).toBe(400);
         expect(body).toEqual({message: "Email already registered"});
         done();
        });
      })
   })

  describe('POST /login, Login as user', () => {
    test(`Should return status 200 and object access_token`, function (done) {
      const data = {
        email: 'john@mail.com',
        password: 'john'
      };
      request(app)
        .post('/login')
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty('access_token', expect.any(String));
          done();
        });
    })
  })

  describe('Errors when login as user', () => {
    test('Should send an error - (Empty email, code: 400)', (done) => {
      request(app)
        .post('/login')
        .send({})
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toEqual({ message: "Email is required" });
          done();
        });
    })

    test('Should send an error - (Email not registred, code: 404)', (done) => {
      const data = {
        email: 'woohoooo@mail.com',
        password: 'foo'
      };
      request(app)
        .post('/login')
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toEqual({message: "Email not registered"});
          done();
        });
    })

    test('Should send an error - (Enter wrong password, code: 400)', (done) => {
      const data = {
        email: 'john@mail.com',
        password: 'foo'
      };
      request(app)
        .post('/login')
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toEqual({message: "Password is wrong"});
          done();
        });
    })
  })
})
