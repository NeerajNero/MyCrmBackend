import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'

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
            return res.status(400).json("Incorrect password")
        }
        res.status(200).json("Logged in successfully")
    }catch(error){
        console.log("error occured while logging in",error.message)
        res.status(500).json({error: error.message})
    }
}

export const signup = async(req,res) => {
    try{
        const {email,password,name} = req.body
        if(!email || !password || !name){
            return res.status(400).json({message: "please enter email and password and name"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "user already exists please login"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({name,email,password: hashedPassword})
        await newUser.save()
        res.status(201).json({message: "user Created"})
    }catch(error){
        console.log("error occured while logging in",error.message)
        res.status(500).json({error: error.message})
    }
}