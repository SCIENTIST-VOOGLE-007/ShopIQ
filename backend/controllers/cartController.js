import Cart from "../models/Cart.js"



export const getCart = async(req,res)=>{

    try{

        const cart = await Cart.findOne({user:req.params.userId})
            .populate("items.product")

        res.json(cart)

    }
    catch(error){

        res.status(500).json({error:"Cart fetch failed"})
    }

}



export const addToCart = async(req,res)=>{

    try{

        const {userId,productId} = req.body

        let cart = await Cart.findOne({user:userId})

        if(!cart){

            cart = new Cart({user:userId,items:[]})
        }

        cart.items.push({
            product:productId,
            quantity:1
        })

        await cart.save()

        res.json(cart)

    }
    catch(error){

        res.status(500).json({error:"Add to cart failed"})
    }

}