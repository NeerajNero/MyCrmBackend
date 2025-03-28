import { Router } from "express";
import { createLead, getLeads, updateLead, deleteLead, getAllLeads } from "../controllers/lead.controller.js"; 
import { auth } from "../middlewares/auth.js";
const router = Router()

router.post('/createLead', auth, createLead )
router.get('/getLeads', auth, getLeads)
router.put('/updateLead/:leadId', auth, updateLead)
router.delete('/deleteLead/:leadId', auth, deleteLead )
router.get('/getAllLeads', auth, getAllLeads)

export default router