const { User } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.access_token, process.env.SECRET)
    req.user = decoded
  } catch (error) {
    next({status: 401, message: 'Not authenticated'})
  }
  User.findOne({
    where: { email : req.user.email }
  })
  .then(isFound => {
    if(!isFound){
      next({status: 404, message: 'User not found'})
    }
    next()
  })
  .catch(err => {
    next(err)
  })
}
