import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app=express();

// connect to db
await connectDB();

app.use(cors())
// app.use(express.json());

//ROUTES
app.get('/', (req,res)=>{
    res.send("api working")
})

app.post('/clerk', express.json(), clerkWebhooks);

const PORT=process.env.port || 5000

app.listen(PORT, ()=>{
    console.log("server running on port", PORT)
})