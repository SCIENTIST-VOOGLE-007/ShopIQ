import Product from "../models/Product.js"
import { recommendProducts } from "./aiService.js"



/*
--------------------------------------------------
SMART PRODUCT RECOMMENDATION
--------------------------------------------------
*/

export const getRecommendations = async (userQuery) => {

  try {

    if (!userQuery || userQuery.trim() === "") {
      throw new Error("Query cannot be empty")
    }



    /*
    -----------------------------------------
    Ask AI engine for recommendations
    -----------------------------------------
    */

    const aiResponse = await recommendProducts(userQuery)



    /*
    Expected AI response format

    {
        products: [
            { name: "Product A" },
            { name: "Product B" }
        ]
    }
    */

    if (!aiResponse || !aiResponse.products) {
      return []
    }



    /*
    -----------------------------------------
    Extract product names
    -----------------------------------------
    */

    const productNames = aiResponse.products.map(p => p.name)



    /*
    -----------------------------------------
    Fetch product details from database
    -----------------------------------------
    */

    const products = await Product.find({
      name: { $in: productNames }
    })



    return products

  } catch (error) {

    console.error("Recommendation Service Error:", error.message)

    throw error

  }

}