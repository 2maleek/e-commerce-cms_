const router = require('express').Router()
const Controller = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authentication)
router.post('/products', Controller.createProduct)
router.get('/products', Controller.findAllProducts)
router.get('/products/user', Controller.findUserProducts)
router.get('/products/:id', Controller.findOneProduct)
router.put('/products/:id', authorization, Controller.updateProduct)
router.delete('/products/:id', authorization, Controller.deleteProduct)

module.exports = router
