import mongoose from "mongoose"

const productSchema = new mongoose.Schema({

    product_id:String,
    title:String,
    category:String,
    price:Number,
    rating:Number,
    review:String,
    source:String,

    createdAt:{
        type:Date,
        default:Date.now
    }

})

export default mongoose.model("Product", productSchema)