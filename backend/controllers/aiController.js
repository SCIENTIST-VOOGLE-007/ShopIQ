import axios from "axios"

const AI_ENGINE_URL = "http://localhost:5001"

export const chatWithAssistant = async (req, res) => {
    try {
        const { message, profile } = req.body
        
        if (!message || !message.trim()) {
            return res.status(400).json({ error: "Message cannot be empty" })
        }

        // Try to call the Python AI engine
        try {
            const aiResponse = await axios.post(`${AI_ENGINE_URL}/chat`, {
                message: message.trim(),
                profile: profile || {}
            })
            
            return res.json(aiResponse.data)
        } catch (aiError) {
            // If AI engine is down, return helpful message
            console.error("AI Engine error:", aiError.message)
            
            return res.json({
                response: `I'd love to help you find "${message}", but my AI engine isn't connected right now. To get recommendations, please ensure: 1) Ollama is running (llama3 model), 2) Python AI engine is started, or try searching by product category. Would you like to browse by category instead?`,
                understanding: "User looking for shopping assistance",
                recommendations: [],
                suggestions: [
                    "Browse by category",
                    "View recommendations",
                    "Compare products",
                    "Check customer reviews"
                ]
            })
        }
    } catch (err) {
        console.error("Chat controller error:", err)
        res.status(500).json({ 
            error: "AI assistant error",
            response: "Sorry, I'm having trouble processing your request. Please try again."
        })
    }
}

export const getRecommendations = async (req, res) => {
    try {
        const { profile, interests } = req.body
        
        const aiResponse = await axios.post(`${AI_ENGINE_URL}/recommend`, {
            profile: profile || {},
            interests: interests || []
        })
        
        return res.json(aiResponse.data)
    } catch (err) {
        console.error("Recommendations error:", err)
        res.status(500).json({ error: "Could not generate recommendations" })
    }
}

export const compareProducts = async (req, res) => {
    try {
        const { products } = req.body
        
        if (!products || products.length < 2) {
            return res.status(400).json({ error: "Need at least 2 products to compare" })
        }
        
        const aiResponse = await axios.post(`${AI_ENGINE_URL}/compare`, {
            products
        })
        
        return res.json(aiResponse.data)
    } catch (err) {
        console.error("Comparison error:", err)
        res.status(500).json({ error: "Could not generate comparison" })
    }
}

export const reviewAnalysis = async (req, res) => {
    try {
        const { products } = req.body
        
        if (!products || products.length === 0) {
            return res.status(400).json({ error: "No products provided" })
        }
        
        const aiResponse = await axios.post(`${AI_ENGINE_URL}/reviews`, {
            products
        })
        
        return res.json(aiResponse.data)
    } catch (err) {
        console.error("Review analysis error:", err)
        res.status(500).json({ error: "Could not analyze reviews" })
    }
}

export const generateReport = async (req, res) => {
    try {
        const { products, profile } = req.body
        
        if (!products || products.length === 0) {
            return res.status(400).json({ error: "No products provided" })
        }
        
        const aiResponse = await axios.post(`${AI_ENGINE_URL}/report`, {
            products,
            profile: profile || {}
        })
        
        return res.json(aiResponse.data)
    } catch (err) {
        console.error("Report generation error:", err)
        res.status(500).json({ error: "Could not generate report" })
    }
}