const express = require('express');
const Review = require('../models/Review')
const Product = require('../models/product')
const {validateReview,isLoggedIn} = require('../middleware')



const router = express.Router() //mini instance

router.post('/products/:id/review',validateReview, async (req,res)=>{
    try{
        let {id} = req.params
        let {rating,comment} = req.body;
        const product = await Product.findById(id);
        // await Review.create({rating,comment})
        const review = new Review({rating,comment})
        product.reviews.push(review)
        await review.save()
        await product.save() 
        // req.flash('msg','Review added successfully')
        req.flash('success','Review added successfully')
        res.redirect(`/products/${id}`)
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

router.delete('/:pid/delete/:rid',async (req,res)=>{
    try{
        let {pid,rid} = req.params;
        await Review.findByIdAndDelete(rid);
        res.redirect(`/products/${pid}`)
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})


module.exports = router;