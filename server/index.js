import express from 'express'
import mongoose from 'mongoose'
import { connection } from './configs/db.config.js'
import { config } from 'dotenv'
import errorHandler from './middlewares/errorHandler.js'
import morgan from 'morgan'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors'
import productRouter from './routes/product.route.js'

config()
const app = express()
const PORT = process.env.PORT || 7070

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

connection.then(() => {
    console.log(`connected to db successfully`);
}).then(() => {
    app.listen(PORT, () => {
        console.log(`server is live on ${PORT}`);
    })
}).catch(err => {
    console.log(`err connecting to db`, err.message);
})

const rootRoute = '/api/v1'
app.use(`${rootRoute}/users`, userRouter)
app.use(`${rootRoute}/auth`, authRouter)
app.use(`${rootRoute}/products`, productRouter)

app.all('*', (req, res) => {
    res.status(404).json({ status: false, message: 'resource not found' })
})
app.use(errorHandler)