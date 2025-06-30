import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRouter from './Routes/AuthRoutes.js'
import BlogRouter from './Routes/BlogRoutes.js'
import { connectDB } from './lib/DB.js'
import cookieParser from 'cookie-parser'


const app=express()
dotenv.config()

const PORT = process.env.PORT || 3000

// Move CORS configuration BEFORE other middleware

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.options('*',cors(
  {
    origin:'http://localhost:5173',
    credentials: true,
  }
))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())

connectDB()

app.use('/api/auth', AuthRouter)
app.use('/api', BlogRouter)

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Blog API' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
//   console.log('Allowed origins:', allowedOrigins);
})