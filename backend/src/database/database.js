const dotenv =require('dotenv')
const mongoose=require('mongoose')
dotenv.config()
const connectDB=async()=>{
    try{
        //connecting to the database

      await  mongoose.connect(process.env.MONGO_URL)
        console.log ("mogoose connected successfully")


    }catch(error){
        console.error(error)
    }
    
}
module.exports=connectDB
