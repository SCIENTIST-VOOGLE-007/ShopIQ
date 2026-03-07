import Product from "../models/Product.js"



export const getProducts = async(req,res)=>{

    try{

        const products = await Product.find().limit(50)

        res.json(products)

    }
    catch(error){

        res.status(500).json({error:"Failed to fetch products"})
    }

}



export const getProductById = async(req,res)=>{

    try{

        const product = await Product.findById(req.params.id)

        res.json(product)

    }
    catch(error){

        res.status(500).json({error:"Product not found"})
    }

}