const express = require('express');
const Product = require('../models/product');
const Review = require('../models/Review');
const {validateProduct} = require('../middleware')

const router = express.Router() //mini instance

//to show all the products
router.get('/products',async (req,res)=>{
    try{
        let products = await Product.find({})
        res.render('./products/index',{products})
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

//to show the form for new products
router.get('/product/new',(req,res)=>{
    try{
        res.render('products/new')
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

//to actually add the product
router.post('/products',validateProduct,async (req,res)=>{
    try{

        let {name,img,price,desc}= req.body
        await Product.create({name,img,price,desc})  //method in mongoose to create new product model.create 
        //it takes time to update so we use async await
        req.flash('success' , 'Product added successfully')

        res.redirect('/products')
    }

    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})


//to actually show a product
router.get('/products/:id',async(req,res)=>{
    try{

        let {id} = req.params;    // getting id passed in url from req.params
        let foundProduct = await Product.findById(id).populate('reviews') // array containing objectID in reviews
        // every record has a unique id given by mongoDB
        res.render('products/show',{foundProduct , msg:req.flash('msg')})
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

//to edit a product
router.get('/products/:id/edit',async (req,res)=>{
    try{
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit',{foundProduct})
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

//to actually update the data 
router.patch('/product/:id',validateProduct,async(req,res)=>{
    try{
        let {id} = req.params;
        let {name,img,price,desc} = req.body
        await Product.findByIdAndUpdate(id,{name,img,price,desc}); //-> mongoose function
        // req.flash('msg' , 'Product edited successfully')
        req.flash('success' , 'Product edited successfully')
        res.redirect(`/products/${id}`)   // fowards a get request 
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

//to delete a product
router.delete('/products/:id',async (req,res)=>{
    try{
        let {id} = req.params
        const product = await Product.findById(id);
        // for(let id of product.reviews){            -> handled in middleware now
        //     await Review.findByIdAndDelete(id)
        // }
        await Product.findByIdAndDelete(id);  // -> when this will run middleware will run then callbackfunction will run then this id is passed as product in middleware callback function
        req.flash('success' , 'Product deleted successfully')
        res.redirect('/products')
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})


module.exports = router;