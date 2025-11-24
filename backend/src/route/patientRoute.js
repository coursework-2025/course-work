const createPatient=require('../controller/patientController.js')
const express=require('express');

const router = express.Router();
router.post('/create', createPatient);
module.exports=router;