import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'

import { initializeDatabase } from './db.connect/db.connect.js'

dotenv.config()

initializeDatabase()

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use('/api',userRoutes)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server is running on port:",PORT)
})
