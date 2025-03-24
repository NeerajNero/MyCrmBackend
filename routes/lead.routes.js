import { Router } from "express";
import { createLead, getLeads } from "../controllers/lead.controller.js"; 
import { auth } from "../middlewares/auth.js";
const router = Router()

router.post('/createLead', auth, createLead )
router.get('/getLeads', auth, getLeads)
export default router