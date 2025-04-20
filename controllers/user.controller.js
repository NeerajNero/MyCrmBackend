import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async(req,res) => {
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.json({message: "please enter email and password"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: "User not found Please signup"})
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(400).json({message: "Incorrect password"})
        }
        const userPayload = await User.findOne({email}).select('-password')
        const token = jwt.sign({user: userPayload}, process.env.JWT_SECRET, {expiresIn: '5d'})
        if(!token){
            return res.status(400).json({message: "unable to generate token"})
        }
        res.cookie('token',token,{httpOnly: true, secure: process.env.NODE_ENV === "Production", sameSite: process.env.NODE_ENV === "Production" ? "strict" : "lax", maxAge: 7*24*60*60*1000})
        res.status(200).json({message: "Logged in successfully", user: userPayload})
    }catch(error){
        console.log("error occured while logging in",error.message)
        res.status(500).json({error: error.message})
    }
}

export const signup = async(req,res) => {
    try{
        const {email,password,name,role} = req.body
        if(!email || !password || !name){
            return res.status(400).json({message: "please enter email and password and name"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "user already exists please login"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({name,email,password: hashedPassword, role})
        await newUser.save()
        const savedUser = await User.findOne({email}).select('-password')
        const token = jwt.sign({user: savedUser}, process.env.JWT_SECRET, {expiresIn: '5d'})
        if(!token){
            return res.status(400).json("unable to generate token")
        }
        res.cookie('token',token,{httpOnly: true, secure: process.env.NODE_ENV === "Production", sameSite: process.env.NODE_ENV === "Production" ? "strict" : "lax", maxAge: 7*24*60*60*1000})
        res.status(201).json({message: "Signup successfull", user: savedUser})
    }catch(error){
        console.log("error occured while logging in",error.message)
        res.status(500).json({error: error.message})
    }
}

export const getAllAgents = async(req,res) => {
    try{
        const allAgents = await User.find({role: "sales_agent"}).select('-role -password')
        if(allAgents.length === 0){
            return res.status(404).json({error: "no agents found"})
        }
        res.status(200).json({message: "fetched all agents", agents: allAgents})
    }catch(error){
        console.log("error occured while fetching agents",error.message)
        res.status(500).json({error: error.message})
    }
}

export const getCurrentUser = async(req,res) => {
    try{
        const {userId} = req.params
        console.log(userId)
        if(!userId){
            return res.status(400).json({message: "user id is required"})
        }
        const currentUser = await User.findById(userId).select('-role -password')
        if(!currentUser){
            return res.status(400).json({message: "no user found"})
        }
        console.log(currentUser)
        res.status(200).json({mmessage: "user fetched successfully", user: currentUser})
    }catch(error){
        console.log("error occured while fetching agent",error.message)
        res.status(500).json({error: error.message})
    }
}

export const logout = async(req,res) => {
    try{
        res.clearCookie('token', {httpOnly: true, secure: process.env.NODE_ENV === "Production", sameSite: process.env.NODE_ENV === "Production" ? "strict" : "lax"})
        res.status(200).json({message: "cookie cleared"})
    }catch(error){
        console.log("error occured while logout",error.message)
        res.status(500).json({error: error.message})
    }
}