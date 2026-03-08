// simple AI controller: echo or canned response
export const chatWithAssistant = async (req,res)=>{
    try{
        const { message } = req.body
        // simple echo responder until real AI is integrated
        const reply = {
            response: `You said: "${message}". I'm a placeholder AI for now!`,
            suggestions: ["Compare products", "View recommendations", "Save for later"]
        }
        res.json(reply)
    } catch(err){
        res.status(500).json({ error: 'AI assistant error' })
    }
}