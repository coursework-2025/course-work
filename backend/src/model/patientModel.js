const mongoose= require('mongoose')
 const patientSchema=new mongoose.Schema({
    name:{
      type:String,
      required: [true,'name is required'],
      minLength:3
    },
    Age:{
      type:Number,
      required:[true, 'age is required'],
      maxLength:2,
    },
    gender:{
      //  
      required:[true, 'gender is required'],
      type:String,
      enum:['f','m']
    },
    homeAddress:{
      type:String,
      required:[true,'homeAddress is required'],
    },
    nextOfKin:{
      type:String,
      required:[true,'nextOfKin is required'],
        minLength:3,   },
    email:{
      type:String,
      trim:true,
      unique: true,
       match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']

    },
    telephoneNo:{
      type:String,
      required:[true,'telephoneNo is required'],
      trim: true,
      unique:true,
    },
    medicalHistory:{
      type: String,
    },

    
    
 })
 module.exports=patientSchema;