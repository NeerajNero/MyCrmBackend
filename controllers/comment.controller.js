import { Comment } from "../models/comment.model.js";

export const addComment = async(req,res) => {
    try{
        const {lead, author, commentText} = req.body
        if(!lead || !author || !commentText){
            return res.status(400).json({message: "all feilds are required!"})
        }
        const newComment = new Comment({lead,author,commentText})
        const saveNewComment = await newComment.save()
        if(!saveNewComment){
            return res.status(400).json({error: "unable to add comment"})
        }
        const populatedComment = await Comment.findById(saveNewComment._id).populate('author').select('-password -role')
        res.status(201).json({message: "comment added successfully", comment: populatedComment})
    }catch(error){
        console.log("error occured while adding comment.",error.message)
        res.status(500).json({error: error.message})
    }
}

export const getAllComments = async(req,res) => {
    try{
        const {leadId} = req.params
        if(!leadId){
            return res.status(400).json({message: "Lead id is required"})
        }
        const comments = await Comment.find({lead: leadId}).populate({path: "author", select: "-password -role"})
        if(comments.length === 0){
            return res.status(404).json({message: "comments not found!"})
        }
        res.status(200).json({message: "comments fetched successfully", comments})
    }catch(error){
        console.log("error occured while fetching comments",error.message)
        res.status(500).json({error: error.message})
    }
}