import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import leadRoutes from './routes/lead.routes.js'
import commentRoutes from './routes/comment.routes.js'
import tagRoutes from './routes/tags.routes.js'

import { initializeDatabase } from './db.connect/db.connect.js'

dotenv.config()

initializeDatabase()

const app = express()

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173','https://crm-tool-iota.vercel.app'],
    credentials: true
}))
app.use(cookieParser())

app.use('/api',userRoutes)
app.use('/lead', leadRoutes)
app.use('/comment', commentRoutes)
app.use('/tag', tagRoutes)
app.get("/", (req,res) => {
    res.status(200).json("Welcome Dev!")
} )

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server is running on port",PORT)
})
