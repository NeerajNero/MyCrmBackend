import {Router} from 'express'
import { signup, login } from '../controllers/user.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/test',auth, async(req,res) => {res.status(200).json("success")})

export default router