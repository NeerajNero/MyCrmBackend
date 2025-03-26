import {Router} from 'express'
import { signup, login, getAllAgents } from '../controllers/user.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/agents', auth, getAllAgents)
router.get('/test',auth, async(req,res) => {res.status(200).json("success")})

export default router