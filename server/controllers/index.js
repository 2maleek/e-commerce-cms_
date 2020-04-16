const { User, Product } = require('../models')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

class Controller {
  static register(req, res, next) {

  let { name, email, password } = req.body
  if(!email) { email = '' }  //handling if email is undefined

    User.findOne({
      where: { email }
    })
    .then(isFound => {
      if(isFound) {
        next({ status: 400, message: "Email already registered" })
      }
      return User.create({
        name,
        email,
        password
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
        next({ status: 404, message: "Email not registered" })
      }
      UserId = isFound.id
      name = isFound.name
      roles = isFound.roles
      return compare(password, isFound.password)
    })
    .then(result => {
      if(!result){
        next({ status: 400, message: "Password is wrong"})
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


}

module.exports = Controller
