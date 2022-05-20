const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

router.get('/infor', auth,  userCtrl.getUser)

router.get('/getall', auth,  userCtrl.getUsers)

router.patch('/addcart', auth, userCtrl.addCart)

router.delete('/product/:id/cart', auth, userCtrl.deleteCart)

router.delete('/user/:id', authAdmin, userCtrl.deleteUser)

router.put('/product/:id/cart', auth, userCtrl.updateCart)

router.get('/history', auth, userCtrl.history)


module.exports = router
