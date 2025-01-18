import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectdb from './config/connectdb.js';   
import lessonRoutes from './routes/lessonRoute.js';
import courseRoutes from './routes/courseRoute.js';
dotenv.config(); 

const app = express();
const port=process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// For using Cors 
app.use(cors());

// For connecting Database 
connectdb(DATABASE_URL);

app.use(express.json());

// Basic route 
app.get('/',(req,res)=>{
    res.status(200).send("Hellow there");

})
app.use('/courses',courseRoutes)
app.use('/lessons',lessonRoutes)


app.listen(port,()=>{
    console.log(`Server is Listening on Port ${port}`)
})