const { User } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.access_token, process.env.SECRET)
    User.findOne({
      where: { email : decoded.email }
    })
    .then(isFound => {
      const { roles }  = isFound
      console.log(roles)
      if(!isFound || !(roles === 'superAdmin' || roles ==='admin')){
        throw{status: 403, message: 'Forbidden access'}
      }
      req.user = decoded
      next()
    })
    .catch(err => {
      next(err)
    })
  } catch (error) {
    throw{status: 401, message: 'Not authenticated'}
  }
}
