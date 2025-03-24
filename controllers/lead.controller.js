import { Lead } from "../models/lead.model.js";

export const createLead = async(req,res) => {
    try{
        const {name,source,salesAgent,status,tags,timeToClose,priority} = req.body
        if(!name || !source || !salesAgent || !status || !tags || !timeToClose || !priority){
            return res.status(400).json({error: "Please enter all required fields"})
        }
        const newLead = new Lead({name,source,salesAgent,status,tags,timeToClose,priority})
        const saveLead = await newLead.save()
        if(!saveLead){
            return res.status(400).json({error: "unable to save new lead"})
        }
        res.status(201).json({message: "new lead created successfully", lead: saveLead})
    }catch(error){
        console.log("error occured while creating lead", error.message)
        res.status(500).json({error: "internal server error"})
    }
}