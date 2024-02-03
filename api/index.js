import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';


dotenv.config()
const app = express();

mongoose.connect(process.env.MONGO_DB_URI).then(()=>{
    console.log('Database is connected')
}).catch((err)=>{
    console.log(err.message)
})

app.listen('3000', ()=>{
    console.log('Server is running on port 3000!!')
})

app.use('/api/user', userRoutes)
