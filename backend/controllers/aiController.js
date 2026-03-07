import axios from "axios"

export const chatWithAssistant = async (req,res)=>{

    try{

        const {message} = req.body

        const response = await axios.post(
            "http://localhost:5001/assistant",
            {message}
        )

        res.json(response.data)

    }
    catch(error){

        res.status(500).json({
            error:"AI assistant error"
        })

    }

}