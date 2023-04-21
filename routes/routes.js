const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const productCtrl = require('../controllers/productCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const upload = require('../controllers/uploadCtrl')
const cartCtrl = require('../controllers/cartCtrl')

router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset', auth, userCtrl.resetPassword)

router.get('/infor', auth, userCtrl.getUserInfor)

router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor)

router.get('/logout', userCtrl.logout)

router.patch('/update', auth, userCtrl.updateUser)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)

// Ptoducts
router.get('/products', productCtrl.products)

router.get('/oneProduct/:id', productCtrl.oneProduct)

router.delete('/delProduct/:id', productCtrl.delProduct)

router.post('/product', upload.single('image'), productCtrl.product)



router.post('/carts', cartCtrl.createCart)

router.get('/get_cart_items', cartCtrl.getCartItem)


// Social Login
router.post('/google_login', userCtrl.googleLogin)

router.post('/facebook_login', userCtrl.facebookLogin)


module.exports = router