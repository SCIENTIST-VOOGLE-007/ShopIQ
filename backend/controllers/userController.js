import User from "../models/User.js"
import bcrypt from "bcryptjs"

export const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        // basic validation
        if(!email || !password){
            return res.status(400).json({error:"Email and password required"})
        }
        const existing = await User.findOne({ email })
        if(existing) return res.status(400).json({error:"User already exists"})
        // hash password
        const hashed = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashed
        })
        await user.save()
        // do not send password
        const { password:_, ...safe } = user.toObject()
        res.json(safe)
    }
    catch(error){
        res.status(500).json({error:"Registration failed"})
    }
}

export const loginUser = async(req,res)=>{
    try{
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user) return res.status(400).json({error:"User not found"})
        const match = await bcrypt.compare(password, user.password)
        if(!match) return res.status(400).json({error:"Invalid credentials"})
        const { password:_, ...safe } = user.toObject()
        res.json(safe)
    } catch(error){
        res.status(500).json({error:"Login failed"})
    }
}

export const updateProfile = async(req,res)=>{
    try{
        const { userId, profile } = req.body
        if(!userId) return res.status(400).json({error:"Missing userId"})
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({error:"User not found"})
        user.profile = { ...user.profile, ...profile }
        await user.save()
        const { password:_, ...safe } = user.toObject()
        res.json(safe)
    } catch(error){
        res.status(500).json({error:"Profile update failed"})
    }
}

export const getProfile = async(req,res)=>{
    try{
        const { userId } = req.query
        if(!userId) return res.status(400).json({error:"Missing userId"})
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({error:"User not found"})
        const { password:_, ...safe } = user.toObject()
        res.json(safe)
    } catch(error){
        res.status(500).json({error:"Could not fetch profile"})
    }
}

export const getUsers = async(req,res)=>{
    const users = await User.find()
    res.json(users)
}