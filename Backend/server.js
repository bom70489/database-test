import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import mongodb from './config/mongodb.js'
import userRoutes from './Routes/userRoutes.js'

dotenv.config()
mongodb()

const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())
app.use(cors())

app.get('/' , (req , res) => {
    res.send('Welcome API')
})


app.use('/api' , userRoutes)

app.listen(PORT , () => {
    console.log('Server running on port' , PORT);
})

