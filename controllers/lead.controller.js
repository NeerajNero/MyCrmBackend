import { Lead } from "../models/lead.model.js";

export const createLead = async(req,res) => {
    try{
        if(!req?.user){
            return res.status(400).json({message: "unauthorized access!"})
        }
        const {name,source,salesAgent,status,tags,timeToClose,priority} = req.body
        if(!name || !source || !salesAgent || !status || !tags || !timeToClose || !priority){
            return res.status(400).json({error: "Please enter all required fields."})
        }
        const newLead = new Lead({name,source,salesAgent,status,tags,timeToClose,priority})
        const saveLead = await newLead.save()
        if(!saveLead){
            return res.status(400).json({error: "unable to save new lead"})
        }
        const findLead = await Lead.findById(saveLead._id).populate('salesAgent')
        res.status(201).json({message: "new lead created successfully", lead: findLead})
    }catch(error){
        console.log("error occured while creating lead", error.message)
        res.status(500).json({error: "internal server error"})
    }
}

export const getLeads = async(req,res) => {
    try{
        const leads = await Lead.find().populate({path: 'salesAgent', select: '-password -role'})
        if(leads.length === 0){
            return res.status(404).json({message: "No leads found"})
        }
        res.status(200).json({message: "leads fetched successfully",totalLeads: leads.length, leads})
    }catch(error){
        console.log("error occured while fetching leads", error.message)
        res.status(500).json({error: "internal server error"})
    }
}

export const updateLead = async(req,res) => {
    try{
        const {leadId} = req.params
        const {name,source,salesAgent,status,tags,timeToClose,priority} = req.body.leadFormData
        if(!leadId){
            return res.status(400).json({message: "lead id is required"})
        }
        if(!name || !source || !salesAgent || !status || !tags || !timeToClose || !priority){
            return res.status(400).json({message: "all fields are required"})
        }
        if(status === "Closed"){
            const closedAt = new Date();
            const updateLead = await Lead.findByIdAndUpdate(leadId, {name,source,salesAgent,status,tags,timeToClose,priority,closedAt},
                {new: true, runValidators: true })
           if(!updateLead){
               return res.status(404).json({message: "lead not found"})
           }
           return res.status(200).json({message: "lead updated successfully", lead: updateLead})
        }
        const updateLead = await Lead.findByIdAndUpdate(leadId, {name,source,salesAgent,status,tags,timeToClose,priority},
             {new: true, runValidators: true })
        if(!updateLead){
            return res.status(404).json({message: "lead not found."})
        }
        const findLead = await Lead.findById(leadId).populate({path: "salesAgent", select: "-password"})
        res.status(200).json({message: "lead updated successfully.", lead: findLead})
    }catch(error){
        console.log("error occured while updating lead", error.message)
        res.status(500).json({error: "internal server error"})
    }
}

export const deleteLead = async(req,res) => {
    try{
        const {leadId} = req.params
        if(!leadId){
            return res.status(400).json({message: "lead Id is required"})
        }
        const removeLead = await Lead.findByIdAndDelete(leadId)
        if(!removeLead){
            return res.status(404).json({message: "Lead not found"})
        }
        res.status(200).json({message: "Lead deleted successfully", leadId})
    }catch(error){
        console.log("error occured while deleting lead", error.message)
        res.status(500).json({error: "internal server error"})
    }
}

export const getAllLeads = async(req,res) => {
    try{
        const leads = await Lead.find({status: {$ne : "Closed"}})
        if(leads.length === 0){
            return res.status(404).json({message: "no leads found"})
        }
        res.status(200).json({message: "leads fetched successfully", leads})
    }catch(error){
        console.log("error occured while fetching leads", error.message)
        res.status(500).json({error: "internal server error"})
    }
}

export const getLeadById = async(req,res) => {
    try{
        const {leadId} = req.params
        if(!leadId){
            return res.status(400).json({message: "lead id is required"})
        }
        const leads = await Lead.findById(leadId).populate({path: 'salesAgent', select: '-password -role'})
        if(leads.length === 0 || !leads){
            return res.status(404).json({message: "No leads found"})
        }
        res.status(200).json({message: "leads fetched successfully...",lead: leads})
    }catch(error){
        console.log("error occured while fetching leads", error.message)
        res.status(500).json({error: "internal server error"})
    }
}

export const getLeadsByAgentId = async(req,res) => {
    try{
        const {agentId} = req.params
        if(!agentId){
            return res.status(400).json("agent Id is required!")
        }
        const leads = await Lead.find({salesAgent: agentId}).populate({path: "salesAgent", select: "-password"})
        if(leads.length === 0){
            return res.status(404).json("no data found!")
        }
        res.status(200).json({message: "data fetched successfully", leads})
    }catch(error){
        console.log("error occured while fetching data!", error.message)
        res.status(500).json({errorMessage: "Internal server error",error: error.message})
    }
}

export const updateLeadStatus = async(req,res) => {
    try{
        const {leadId} = req.params
        const {status} = req.body
        if(!leadId || !status){
            return res.status(400).json({error: "lead id and status is required!"})
        }
        const updateLead = await Lead.findByIdAndUpdate(leadId, {status, closedAt: new Date()}, {new: true})
        res.status(200).json({message: "lead updated successfully", lead: updateLead})
    }catch(error){
        console.log("error occured while updating status", error.message)
        res.status(500).json({error: "Internal server error",errorMessage: error.message})
    }
}