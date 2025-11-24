const cors=require('cors')
const express=require('express')
const dotenv =require('dotenv');
const connectDB=require('./src/database/database.js')
dotenv.config()

const PORT=process.env.PORT
const app=express()
app.use(express.json)
app.use(cors())

app.listen(PORT,async()=>{
    console.log(`server started at http://localhost:${PORT}`)
    await connectDB()
});
