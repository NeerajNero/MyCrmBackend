import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { initializeDatabase } from './db.connect/db.connect.js'

dotenv.config()

initializeDatabase()

const app = express()

app.use(express.json)
app.use(cors({
    origin: 'http://localhost:5173'
}))

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server is running on port:",PORT)
})
