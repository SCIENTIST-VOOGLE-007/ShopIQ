import Product from "../models/Product.js"
import { compareProductsAI } from "./aiService.js"



/*
--------------------------------------------------
COMPARE PRODUCTS
--------------------------------------------------
*/

export const compareProducts = async (productIds) => {

  try {

    if (!productIds || productIds.length < 2) {
      throw new Error("At least two products are required for comparison")
    }



    /*
    -----------------------------------------
    Fetch products from database
    -----------------------------------------
    */

    const products = await Product.find({
      _id: { $in: productIds }
    })



    if (!products || products.length === 0) {
      throw new Error("Products not found")
    }



    /*
    -----------------------------------------
    Format product data
    -----------------------------------------
    */

    const formattedProducts = products.map((product) => ({

      name: product.name,
      price: product.price,
      rating: product.rating,
      brand: product.brand,
      category: product.category,
      description: product.description

    }))



    /*
    -----------------------------------------
    Send to AI engine
    -----------------------------------------
    */

    const aiResult = await compareProductsAI(formattedProducts)



    return {
      products: formattedProducts,
      comparison: aiResult
    }

  } catch (error) {

    console.error("Comparison Service Error:", error.message)

    throw error

  }

}