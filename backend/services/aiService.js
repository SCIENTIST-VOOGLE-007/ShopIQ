import axios from "axios"

const AI_ENGINE_URL = "http://localhost:5001"



/*
--------------------------------------------------
RECOMMEND PRODUCTS
--------------------------------------------------
*/

export const recommendProducts = async (query) => {
  try {

    const response = await axios.post(
      `${AI_ENGINE_URL}/recommend`,
      { query: query }
    )

    return response.data

  } catch (error) {

    console.error("AI Recommendation Error:", error.message)

    throw new Error("Failed to fetch AI recommendations")

  }
}




/*
--------------------------------------------------
COMPARE PRODUCTS
--------------------------------------------------
*/

export const compareProductsAI = async (products) => {

  try {

    const response = await axios.post(
      `${AI_ENGINE_URL}/compare`,
      { products: products }
    )

    return response.data

  } catch (error) {

    console.error("AI Comparison Error:", error.message)

    throw new Error("Failed to compare products")

  }

}



/*
--------------------------------------------------
SUMMARIZE REVIEWS
--------------------------------------------------
*/

export const summarizeReviews = async (reviews) => {

  try {

    const response = await axios.post(
      `${AI_ENGINE_URL}/summarize`,
      { reviews: reviews }
    )

    return response.data

  } catch (error) {

    console.error("Review Summary Error:", error.message)

    throw new Error("Failed to summarize reviews")

  }

}



/*
--------------------------------------------------
BUILD USER PROFILE
--------------------------------------------------
*/

export const buildUserProfile = async (history) => {

  try {

    const response = await axios.post(
      `${AI_ENGINE_URL}/profile`,
      { history: history }
    )

    return response.data

  } catch (error) {

    console.error("Profile Builder Error:", error.message)

    throw new Error("Failed to build user profile")

  }

}




/*
--------------------------------------------------
CART ANALYSIS
--------------------------------------------------
*/

export const analyzeCart = async (cartItems) => {

  try {

    const response = await axios.post(
      `${AI_ENGINE_URL}/cart-analysis`,
      { cart: cartItems }
    )

    return response.data

  } catch (error) {

    console.error("Cart Analysis Error:", error.message)

    throw new Error("Failed to analyze cart")

  }

}




/*
--------------------------------------------------
ORDER ASSISTANT
--------------------------------------------------
*/

export const orderAssistant = async (orderData) => {

  try {

    const response = await axios.post(
      `${AI_ENGINE_URL}/order-help`,
      { order: orderData }
    )

    return response.data

  } catch (error) {

    console.error("Order Assistant Error:", error.message)

    throw new Error("Failed to process order help")

  }

}