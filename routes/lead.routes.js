import { Router } from "express";
import { createLead, getLeads, updateLead, deleteLead, getAllLeads, getLeadById, getLeadsByAgentId, updateLeadStatus } from "../controllers/lead.controller.js"; 
import { auth } from "../middlewares/auth.js";
const router = Router()

router.post('/createLead', auth, createLead )
router.get('/getLeads', auth, getLeads)
router.put('/updateLead/:leadId', auth, updateLead)
router.delete('/deleteLead/:leadId', auth, deleteLead )
router.get('/getAllLeads', auth, getAllLeads)
router.get('/getLeadById/:leadId', auth, getLeadById)
router.get('/getLeadsByAgent/:agentId', auth, getLeadsByAgentId)
router.patch('/closeLead/:leadId', auth, updateLeadStatus)

export default router