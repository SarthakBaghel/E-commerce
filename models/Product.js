const mongoose = require('mongoose')
const Review = require('./Review')

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:true
    },
    // multiple properties to name so we use object
    img:{
        type:String,
        trim:true,
        // default:
    } ,
    price:{
        type:Number,
        min:0,
        required:true
    } ,
    desc:{
        type:String,
        trim:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})


//middleware jo BTS mongodb operations krwane par use hota hai and iske andar pre and post middleware hote hai which are basically used over Schema and before the model

productSchema.post('findOneAndDelete',async function(product){
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})

//product -> when the method is run product will be passed there 





let Product = mongoose.model('Product',productSchema)

module.exports = Product
