import { Tag } from "../models/tag.model.js";

export const addTag = async(req,res) => {
    try{
        const {name} = req.body
        if(!name){
            return res.status(400).json({message: 'Name is required'})
        }
        const newTag = new Tag({name})
        const saveTag = await newTag.save()
        if(!saveTag){
            return res.status(400).json({message: "error occured while saving tag",error: error.message})
        }
        res.status(201).json({message: "tag created successfully", tag: saveTag})
    }catch(error){
        console.log("error occured while adding tag")
        res.status(500).json({error: "Internal server error",errorMessage: error.message})
    }
}

export const getTags = async(req,res) => {
    try{
        const tags = await Tag.find()
        if(tags.length === 0){
            return res.status(404).json({message: "no tags found"})
        }
        return res.status(200).json({message: "Tags fetched successfully", tags})
    }catch(error){
        console.log("error occured while fetching tags")
        res.status(500).json({error: "Internal server error",errorMessage: error.message})
    }
}