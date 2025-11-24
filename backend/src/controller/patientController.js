const patientSchema=require('../model/patientModel.js')
const createPatient=(req,res)=>{
    try{
        const patientData=req.body;
        if(!patientData){
            return res.status(400).json({
                sucess:false,
                message:'no record to add',
            })
        }
        patientData=patientSchema.create().lean();
        res.status(201).json({
            sucess:true,
            message:'message created successfully',
            data:patientData
        })
    

    } catch(error){
        console.error('server error');
        res.status(500).json({
            message:error.message
        })

    }
}

module.exports=createPatient;