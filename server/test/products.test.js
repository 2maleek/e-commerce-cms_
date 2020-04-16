const request = require('supertest');
const app = require('../server')
const { sequelize, User, Product } = require('../models');
const { queryInterface } = sequelize;
const jwt = require('jsonwebtoken')
let access_token = null
let access_token_superadmin = null
let idProduct = null
let otherIdProduct = null
let UserId = null
beforeAll(done => {
  User.create({
    name: 'test',
    email: 'test@mail.com',
    password: 'test',
  })
  .then((data) => {
    UserId = data.id
    access_token = jwt.sign({
      UserId: UserId,
      name: data.name,
      email: data.email,
      roles: data.roles
    }, 'pipopipo')
    let product = {
      'name': 'Adidas shoes',
      'description': 'greatest shoes ever',
      'category': 'shoes',
      'price': 900000,
      'stock': 120,
      'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg',
      'UserId': UserId
    }
    return Product.create(product) //create product with user id same current token id
  })
  .then((newProduct) => {
    idProduct = newProduct.id
    let otherProduct = {
      'name': 'Adidas shoes',
      'description': 'greatest shoes ever',
      'category': 'shoes',
      'price': 900000,
      'stock': 120,
      'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg',
      'UserId': 1
    }
    return Product.create(otherProduct)
  })
  .then((newotherProduct) => {
    otherIdProduct = newotherProduct.id
    //create superAdmin
    return User.create({
      name: 'SA',
      email: 'SA@mail.com',
      password: 'SA',
      roles: 'superAdmin',
    })
  })
  .then(SaData => {
    access_token_superadmin = jwt.sign({
      UserId: SaData.id,
      name: SaData.name,
      email: SaData.email,
      roles: SaData.roles
    }, 'pipopipo')
    done()
  })
  .catch(err=> {
    done(err)
  })
})

afterAll(done => {
  queryInterface
    .bulkDelete('Products', {})
    .then(() => {
      return queryInterface.bulkDelete('Users', {})
    })
    .then(() => done())
    .catch(err => done(err));
});




describe('Prouducts Routes Test', () => {
  describe('Create new product', () => {
    test(`Create a new product with good request`, function (done) {
      let data = {
        'name': 'Adidas shoes',
        'description': 'greatest shoes ever',
        'category': 'shoes',
        'price': 900000,
        'stock': 120,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg'
      }
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('name', data.name);
          expect(body).toHaveProperty('description', data.description);
          expect(body).toHaveProperty('category', data.category);
          expect(body).toHaveProperty('price', data.price);
          expect(body).toHaveProperty('stock', data.stock);
          expect(body).toHaveProperty('image_url', data.image_url);
          expect(body).toHaveProperty('UserId', expect.any(Number));
          expect(body.price).toBeGreaterThan(0);
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Create product without send category, the category will be "other"`, function (done) {
      let data = {
        'name': 'Adidas shoes',
        'description': 'greatest shoes ever',
        'price': 900000,
        'stock': 120,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg'
      }
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('name', data.name);
          expect(body).toHaveProperty('description', data.description);
          expect(body).toHaveProperty('category', 'other');
          expect(body).toHaveProperty('price', data.price);
          expect(body).toHaveProperty('stock', data.stock);
          expect(body).toHaveProperty('image_url', data.image_url);
          expect(body).toHaveProperty('UserId', expect.any(Number));
          expect(body.price).toBeGreaterThan(0);
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

  })

  describe('Error when create new product', () => {
    test(`Error when create product without access_token (Not authenticated, 401)`, function (done) {
      let data = {
        'name': 'Adidas shoes',
        'description': 'greatest shoes ever',
        'category': 'shoes',
        'price': 900000,
        'stock': 120,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg'
      }
      request(app)
        .post('/products')
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Not authenticated');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when create new product with invalid access_token (Not authenticated, 401)`, function (done) {
      let data = {
        'name': 'Adidas shoes',
        'description': 'greatest shoes ever',
        'price': 900000,
        'stock': 120,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg'
      }
      request(app)
        .post('/products')
        .set('access_token', 'invalid_$$access$$_token')
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Not authenticated');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when create new product with Empty Body (Bad Request, 400)`, function (done) {
      const expectedErrors = [
        { message: "Name is required" },
        { message: "Description is required" },
        { message: "Price is required" },
        { message: "Stock is required" },
        { message: "Image url is required" }
      ]

      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send({})
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toEqual(expect.arrayContaining(expectedErrors));
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when create new product withPrice and stock is less than 1 (Bad Request, 400)`, function (done) {
      let data = {
        'name': 'Adidas shoes',
        'description': 'greatest shoes ever',
        'price': 0,
        'stock': -1,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg'
      }
      request(app)
        .post('/products')
        .set('access_token', access_token)
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message', 'Price and Stock must not be below 0');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)
  })

  describe('Find all products', () => {
    test(`Find all products with token`, function (done) {
      request(app)
        .get('/products')
        .set('access_token', access_token)
        .then(response => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(body[0]).toHaveProperty('id', expect.any(Number));
          expect(body[0]).toHaveProperty('name', expect.any(String));
          expect(body[0]).toHaveProperty('description', expect.any(String));
          expect(body[0]).toHaveProperty('category',expect.any(String));
          expect(body[0]).toHaveProperty('price', expect.any(Number));
          expect(body[0]).toHaveProperty('stock', expect.any(Number));
          expect(body[0]).toHaveProperty('image_url', expect.any(String));
          expect(body[0]).toHaveProperty('UserId', expect.any(Number));
          expect(body.length).toBeGreaterThan(0);
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)
  })

  describe('Error when find all products', () => {
    test(`Error when find all products without access_token (Not authenticated, 401)`, function (done) {
      request(app)
        .get('/products')
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Not authenticated');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when find all producst with invalid access_token (Not authenticated, 401)`, function (done) {
      request(app)
        .get('/products')
        .set('access_token', 'invalid_$$access$$_token')
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Not authenticated');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

  })

  describe('Find one product', () => {
    test(`Find one product with token`, function (done) {
      request(app)
        .get(`/products/${idProduct}`)
        .set('access_token', access_token)
        .then(response => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('name', expect.any(String));
          expect(body).toHaveProperty('description', expect.any(String));
          expect(body).toHaveProperty('category',expect.any(String));
          expect(body).toHaveProperty('price', expect.any(Number));
          expect(body).toHaveProperty('stock', expect.any(Number));
          expect(body).toHaveProperty('image_url', expect.any(String));
          expect(body).toHaveProperty('UserId', expect.any(Number));
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)
  })

  describe('Error when find one product', () => {
    test(`Error when find one product without access_token (Not authenticated, 401)`, function (done) {
      request(app)
        .get(`/products/${idProduct}`)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Not authenticated');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when find one product with invalid access_token (Not authenticated, 401)`, function (done) {
      request(app)
        .get(`/products/${idProduct}`)
        .set('access_token', 'invalid_$$access$$_token')
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Not authenticated');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when update product where product is not found(Product not found, 404)`, function (done) {
      let data = {
        'name': 'new Adidas shoes',
        'description': 'new greatest shoes ever',
        'category': 'shoes',
        'price': 1200000,
        'stock': 20,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg',
      }
      request(app)
        .get('/products/9999999')
        .set('access_token', access_token)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty('message', 'Product not found');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

  })

  describe('Update product', () => {
    test(`Update product with token`, function (done) {
      let data = {
        'name': 'new Adidas shoes',
        'description': 'new greatest shoes ever',
        'category': 'shoes',
        'price': 1200000,
        'stock': 20,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg',
      }
      request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', access_token)
        .send(data)
        .then(response => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('name', data.name);
          expect(body).toHaveProperty('description', data.description);
          expect(body).toHaveProperty('category', data.category);
          expect(body).toHaveProperty('price', data.price);
          expect(body).toHaveProperty('stock', data.stock);
          expect(body).toHaveProperty('image_url', data.image_url);
          expect(body).toHaveProperty('UserId', expect.any(Number));
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    //superAdmin can update product without authorization, but cannot change the UserId in product
    test(`superadmin Update product with token without authorization`, function (done) {
      let data = {
        'name': 'SuperAdmin Adidas shoes',
        'description': 'SuperAdmin greatest shoes ever',
        'category': 'shoes',
        'price': 11200000,
        'stock': 2,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg',
      }
      request(app)
        .put(`/products/${otherIdProduct}`)
        .set('access_token', access_token)
        .send(data)
        .then(response => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('name', data.name);
          expect(body).toHaveProperty('description', data.description);
          expect(body).toHaveProperty('category', data.category);
          expect(body).toHaveProperty('price', data.price);
          expect(body).toHaveProperty('stock', data.stock);
          expect(body).toHaveProperty('image_url', data.image_url);
          expect(body).toHaveProperty('UserId', UserId);
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)
  })

  describe('Error when update product', () => {
    test(`Error when update product without access_token (Not authenticated, 401)`, function (done) {
      let data = {
        'name': 'new Adidas shoes',
        'description': 'new greatest shoes ever',
        'category': 'shoes',
        'price': 1200000,
        'stock': 20,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg',
      }
      request(app)
        .put(`/products/${idProduct}`)
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Not authenticated');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when update product with invalid access_token (Not authenticated, 401)`, function (done) {
      let data = {
        'name': 'new Adidas shoes',
        'description': 'new greatest shoes ever',
        'category': 'shoes',
        'price': 1200000,
        'stock': 20,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg',
      }
      request(app)
        .put(`/products/${idProduct}`)
        .set('access_token', 'invalid_$$access$$_token')
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Not authenticated');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when update product where product is not found(Product not found, 404)`, function (done) {
      let data = {
        'name': 'new Adidas shoes',
        'description': 'new greatest shoes ever',
        'category': 'shoes',
        'price': 1200000,
        'stock': 20,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg',
      }
      request(app)
        .put('/products/9999999')
        .set('access_token', access_token)
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty('message', 'Product not found');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when update product where is not its product (Forbidden access, 403)`, function (done) {
      let data = {
        'name': 'new Adidas shoes',
        'description': 'new greatest shoes ever',
        'category': 'shoes',
        'price': 1200000,
        'stock': 20,
        'image_url': 'https://ecs7.tokopedia.net/img/cache/700/product-1/2016/8/25/23693252/23693252_8c4547df-2700-4728-971d-14a01db3cf2c.jpg',
      }
      request(app)
        .put(`/products/${otherIdProduct}`)
        .set('access_token', access_token)
        .send(data)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(403);
          expect(body).toHaveProperty('message', 'Forbidden access');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

  })

  describe('Delete product', () => {
    test(`Delete product with token`, function (done) {
      request(app)
        .delete(`/products/${idProduct}`)
        .set('access_token', access_token)
        .then(response => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('name', expect.any(String));
          expect(body).toHaveProperty('description', expect.any(String));
          expect(body).toHaveProperty('category', expect.any(String));
          expect(body).toHaveProperty('price', expect.any(Number));
          expect(body).toHaveProperty('stock', expect.any(Number));
          expect(body).toHaveProperty('image_url', expect.any(String));
          expect(body).toHaveProperty('UserId', expect.any(Number));
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    //superAdmin can delete product without authorization
    test(`superadmin delete product with token without authorization`, function (done) {
      request(app)
        .delete(`/products/${otherIdProduct}`)
        .set('access_token', access_token)
        .then(response => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('name', expect.any(String));
          expect(body).toHaveProperty('description', expect.any(String));
          expect(body).toHaveProperty('category', expect.any(String));
          expect(body).toHaveProperty('price', expect.any(Number));
          expect(body).toHaveProperty('stock', expect.any(Number));
          expect(body).toHaveProperty('image_url', expect.any(String));
          expect(body).toHaveProperty('UserId', expect.any(Number));
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)
  })

  describe('Error when delete product', () => {
    test(`Error when delete product without access_token (Not authenticated, 401)`, function (done) {
      request(app)
        .delete(`/products/${idProduct}`)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Not authenticated');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when delete product with invalid access_token (Not authenticated, 401)`, function (done) {
      request(app)
        .delete(`/products/${idProduct}`)
        .set('access_token', 'invalid_$$access$$_token')
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body).toHaveProperty('message', 'Not authenticated');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when delete product where product is not found(Product not found, 404)`, function (done) {
      request(app)
        .delete('/products/999999')
        .set('access_token', access_token)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty('message', 'Product not found');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

    test(`Error when delete product where is not its product (Forbidden access, 403)`, function (done) {
      request(app)
        .delete(`/products/${otherIdProduct}`)
        .set('access_token', access_token)
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(403);
          expect(body).toHaveProperty('message', 'Forbidden access');
          done();
        })
        .catch(err => {
          done(err)
        });
    }, 50000)

  })
})
