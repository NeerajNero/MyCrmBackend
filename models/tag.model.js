import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tag name is required'],
    unique: true,  
  }
},{timestamps: true});

export const Tag = mongoose.model('Tag', tagSchema, 'MP2Tag');
