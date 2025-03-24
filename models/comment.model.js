import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead', 
    required: [true, 'Lead reference is required'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: [true, 'Author is required'],
  },
  commentText: {
    type: String,
    required: [true, 'Comment text is required'],
  },
},{timestamps: true});

export const Comment = mongoose.model('Comment', commentSchema, 'MP2Comment');