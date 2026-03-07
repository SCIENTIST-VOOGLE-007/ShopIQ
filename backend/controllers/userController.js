import User from "../models/User.js"



export const registerUser = async(req,res)=>{

    try{

        const {name,email,password} = req.body

        const user = new User({
            name,
            email,
            password
        })

        await user.save()

        res.json(user)

    }
    catch(error){

        res.status(500).json({error:"Registration failed"})
    }

}



export const getUsers = async(req,res)=>{

    const users = await User.find()

    res.json(users)

}