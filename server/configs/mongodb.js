import mongoose from "mongoose"

const connectDB = async()=>{
    mongoose.connection.on('connected', ()=> console.log('database connected'))

    await mongoose.connect("mongodb+srv://krishna:krishna@webdevlearn.allo9vb.mongodb.net/lms")
}

export default connectDB;