const { Product } = require('../models')

module.exports = (req, res, next) => {
  let { UserId, roles } = req.user
  let id = req.params.id

  Product.findOne({
    where: { id }
  })
  .then(isFound => {
    if(!isFound) {
      throw {status: 404, message: 'Product not found'}
    }
    if(UserId !== isFound.UserId && roles !== 'superadmin') {
      throw {status: 403, message: 'Forbidden access'}
    }
    next()
  })
  .catch(err => {
    next(err)
  })
}
