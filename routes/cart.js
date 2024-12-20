const express = require('express')
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Product = require('../models/product');
const User = require('../models/User');


router.get('/user/cart',isLoggedIn,async(req,res)=>{
    let user = await User.findById(req.user._id).populate('cart')
    // fetches whole product from product object id present in cart array so that we can access the whole product
    res.render('./cart/cart',{user})
})




//actually adding product to the cart
router.post('/user/:productId/add',isLoggedIn,async (req,res)=>{
    let {productId} = req.params  //same as given above {}
    let userId = req.user._id
    let product = await Product.findById(productId)
    let user = await User.findById(userId)
    user.cart.push(product)
    await user.save()
    res.redirect('/user/cart')
})


module.exports = router


