const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/products')
    .get(productCtrl.getProducts)
    .post(auth, authAdmin, productCtrl.createProduct)

router.route('/products/best-sellers')
    .get(productCtrl.getBestSellers)

    router.route('/products/new')
    .get(productCtrl.getNewProducts)

    router.route('/products/:id/best-s ellers')
    .post(auth, authAdmin, productCtrl.updateBestSeller)

router.route('/products/:id')
    .delete(auth, authAdmin, productCtrl.deleteProduct)
    .put(auth, authAdmin, productCtrl.updateProduct)

module.exports = router