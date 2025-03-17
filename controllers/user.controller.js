import { User } from "../models/user.model.js";

export const login = async(req,res) => {
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.json({message: "please enter email and password"})
        }
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
        const newUser = new User({name,email,password})
        await newUser.save()
        res.status(201).json({message: "user Created"})
    }catch(error){
        console.log("error occured while logging in",error.message)
        res.status(500).json({error: error.message})
    }
}