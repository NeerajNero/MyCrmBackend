import { Router } from "express";
import { addComment,getAllComments } from "../controllers/comment.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router()

router.post('/addComment', auth, addComment)
router.get('/getAllComments/:leadId', auth, getAllComments)

export default router