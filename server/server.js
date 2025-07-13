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

// app.get('/test', async (req,res)=>{
//   const user = await User.create({
//     _id: "123",
//     name: "test user",
//     email: "test@email.com",
//     imageUrl: "test.jpg",
//   })
//   res.json(user)
// })

app.post('/test', express.json(), (req,res)=>{
  console.log("Test route hit:", req.body);
  res.send("ok");
});

app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);


const PORT=process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log("server running on port", PORT)
})