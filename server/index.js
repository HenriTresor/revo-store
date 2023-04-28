import express from 'express'
import mongoose from 'mongoose'
import { connection } from './configs/db.config.js'
import { config } from 'dotenv'
import errorHandler from './middlewares/errorHandler.js'
import morgan from 'morgan'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

config()
const app = express()
const PORT = process.env.PORT || 7070

app.use(morgan('dev'))
app.use(express.json())

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

app.all('*', (req, res) => {
    res.status(404).json({ status: false, message: 'resource not found' })
})
app.use(errorHandler)