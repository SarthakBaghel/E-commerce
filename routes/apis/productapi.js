const express = require('express')
const User = require('../../models/User')
const router = express.Router()

router.post('/product/:productId/like',async(req,res)=>{
    let {productId} = req.params
    let user = req.user
    let isLiked = user.wishlist.includes(productId)

    if(isLiked){
        await User.findByIdAndUpdate(req.user._id,{$pull:{wishlist:productId}})
    }else{
        await User.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:productId}})
    }
    res.redirect('/products')
})

module.exports = router
