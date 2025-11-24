const dotenv = require('dotenv')
const mongoose= require('mongoose')
dotenv.config()

exports.connectDB= async()=>{
    try{
        //connecting to the database
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongoose connected successfully")
        

    } catch(error){
        console.error(error)
        
    }
}