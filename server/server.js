import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import User from './models/User.js';

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

app.post('/demo', async(req,res)=>{
    await User.create({
  _id: "testid",
  email: "test@example.com",
  name: "Test User",
  imageUrl: ""
});
})

const PORT=process.env.port || 5000

app.listen(PORT, ()=>{
    console.log("server running on port", PORT)
})