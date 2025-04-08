import {Router} from 'express'
import { addTag,getTags } from '../controllers/tag.controller.js'
import {auth} from '../middlewares/auth.js'

const router = Router()

router.post('/addTag',auth,addTag)
router.get('/tags',auth, getTags)

export default router