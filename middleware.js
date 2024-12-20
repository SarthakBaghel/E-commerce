const Product = require('./models/product');
const {productSchema,reviewSchema} = require('./schema')

const validateProduct = (req,res,next)=>{
    const {name,img,price,desc} = req.body;
    const {error} = productSchema.validate({name,img,price,desc}) //returns error,value as object but we only need error (read docs for more info)
    if(error){
        return res.render('error')
    }
    next();
}
const validateReview = (req,res,next)=>{
    const {rating,comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment}) //returns error,value as object but we only need error (read docs for more info)
    if(error){
        return res.render('error')
    }
    next();
}

const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','please login first')
        return res.redirect('/login')
    }
    next();
}

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error','do not have permission to do that')
        return res.redirect('/products')
    }
    else if(req.user.role!=='seller'){
        req.flash('error','do not have permission to do that')
        return res.redirect('/products')
    }
    next()
}

const isProductAuthor = async(req,res,next)=>{
    let {id} = req.params;  //product id
    const product = await Product.findById(id)
    if(!product.author.equals(req.user._id)){       //to compare two ids 
        req.flash('error','do not have permission to do that')
        return res.redirect('/products')
    }
    next()
}

module.exports = {isProductAuthor,isSeller,isLoggedIn,validateProduct,validateReview}