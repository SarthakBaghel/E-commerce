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

module.exports = {validateProduct,validateReview}