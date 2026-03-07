import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            quantity:Number
        }
    ],

    status:{
        type:String,
        default:"Processing"
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})

export default mongoose.model("Order", orderSchema)