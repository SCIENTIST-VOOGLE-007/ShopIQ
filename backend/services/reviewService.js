import Product from "../models/Product.js"
import { summarizeReviews } from "./aiService.js"



/*
--------------------------------------------------
SUMMARIZE PRODUCT REVIEWS
--------------------------------------------------
*/

export const getReviewSummary = async (productId) => {

  try {

    if (!productId) {
      throw new Error("Product ID required")
    }



    /*
    -----------------------------------------
    Fetch product
    -----------------------------------------
    */

    const product = await Product.findById(productId)



    if (!product) {
      throw new Error("Product not found")
    }



    /*
    -----------------------------------------
    Extract reviews
    -----------------------------------------
    */

    const reviews = product.reviews || []



    if (reviews.length === 0) {
      return {
        summary: "No reviews available for this product."
      }
    }



    /*
    -----------------------------------------
    Format reviews
    -----------------------------------------
    */

    const reviewTexts = reviews.map((review) => review.comment)



    /*
    -----------------------------------------
    Send reviews to AI engine
    -----------------------------------------
    */

    const summary = await summarizeReviews(reviewTexts)



    return {
      product: product.name,
      summary: summary
    }

  } catch (error) {

    console.error("Review Service Error:", error.message)

    throw error

  }

}