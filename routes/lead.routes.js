import { Router } from "express";
import { createLead } from "../controllers/lead.controller.js"; 
import { auth } from "../middlewares/auth.js";
const router = Router()

router.post('/createLead',auth, createLead )

export default router