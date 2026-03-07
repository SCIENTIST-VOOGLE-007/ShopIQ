import Order from "../models/Order.js"



export const placeOrder = async(req,res)=>{

    try{

        const {userId,items} = req.body

        const order = new Order({
            user:userId,
            items
        })

        await order.save()

        res.json(order)

    }
    catch(error){

        res.status(500).json({error:"Order failed"})
    }

}



export const getOrders = async(req,res)=>{

    const orders = await Order.find({user:req.params.userId})
        .populate("items.product")

    res.json(orders)

}