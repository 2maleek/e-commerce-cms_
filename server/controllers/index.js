const { User, Product } = require('../models')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

class Controller {
  static register(req, res, next) {

  let { name, email, password, roles } = req.body

  if(!email) { email = '' }  //handling if email is undefined

    User.findOne({
      where: { email }
    })
    .then(isFound => {
      if(isFound) {
        throw{ status: 400, message: "Email already registered" }
      }
      return User.create({
        name,
        email,
        password,
        roles
      })
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(err => {
        next(err)
      })
    })
  }

  static login(req, res, next) {
    let { email, password} = req.body
    let roles, name, UserId;
    if(!email) {
      throw { status: 400, message: "Email is required"}
    }  //handling if email is null or empty Should not check in db

    User.findOne({
      where: { email }
    })
    .then(isFound => {
      if(!isFound) {
        throw{ status: 404, message: "Email not registered" }
      }
      UserId = isFound.id
      name = isFound.name
      roles = isFound.roles
      return compare(password, isFound.password)
    })
    .then(result => {
      if(!result){
        throw{ status: 400, message: "Password is wrong"}
      }
      let access_token = jwt.sign({
        UserId,
        email,
        name,
        roles,
      }, process.env.SECRET)
      res.status(200).json({access_token})
    })
    .catch(err => {
      next(err)
    })
  }

  static createProduct(req, res, next) {
    const { UserId } = req.user
    const { name, description, category , price, stock, image_url } = req.body
    if(price <= 0 || stock <= 0) {
      next({status: 400, message: "Price and Stock must not be below 0"})
    }
    Product.create({
      name,
      description,
      category,
      price,
      stock,
      image_url,
      UserId
    })
    .then(newProduct => {
      res.status(201).json(newProduct)
    })
    .catch(err => {
      next(err)
    })
  }

  static findAllProducts(req, res, next) {
    Product.findAll()
    .then(products => {
      if(!products) {
        throw{ status: 404, message: "There are no products"}
      }
      res.status(200).json(products)
    })
    .catch(err => {
      next(err)
    })
  }

  static findUserProducts(req, res, next) {
    const { UserId } = req.user
    Product.findAll({
      where: { UserId }
    })
    .then(products => {
      if(!products) {
        throw{ status: 404, message: "There are no products"}
      }
      res.status(200).json(products)
    })
    .catch(err => {
      next(err)
    })
  }

  static findOneProduct(req, res, next) {
    let id = req.params.id
    Product.findByPk(id)
    .then(isFound => {
      if(!isFound ) {
        next({status: 404, message: "Product not found"})
      }
      res.status(200).json(isFound)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateProduct(req, res, next) {
    let id = Number(req.params.id)
    const { UserId, roles } = req.user
    const { name, description, category , price, stock, image_url } = req.body
    if(price <= 0 || stock < 0) {
      next({status: 400, message: "Price must greater than 0 and stock can't be minus"})
    }
    const dataUpdate = {
      id,
      name,
      description,
      category,
      price,
      stock,
      image_url,
    }

    Product.findByPk(id)
    .then(isFound => {
      console.log(isFound)
      if(!isFound) {
        next({ status: 404, message: "Product not found"})
      }
      return Product.update(dataUpdate, {
        where: { id }
      })
    })
    .then(() => {
      return Product.findByPk(id)
    })
    .then(updatedProduct => {
      res.status(200).json(updatedProduct)
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteProduct(req, res, next) {
    let id = req.params.id
    let deletedProduct
    Product.findByPk(id)
    .then(isFound => {
      if(!isFound) {
        next({ status: 404, message: "Product not found"})
      }
      deletedProduct = isFound
      return Product.destroy({
        where: { id }
      })
    })
    .then(() => {
      res.status(200).json(deletedProduct)
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = Controller
