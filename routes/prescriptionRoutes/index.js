import express from 'express'
import { checkToken } from '../../middlewares/checkToken.js'
import Prescription from '../../db/models/prescriptionSchema.js'


const router=express.Router()

router.post('/',checkToken(['DOCTOR']),async(req,res)=>{
    try{
        const prescription =await Prescription.create(req.body)
        return res.status(201).json({message:'Prescription added'})
    }catch(e){
        return res.status(500).json(e)
    }
   
})

router.get('/appointment/:id',checkToken(['DOCTOR','USER']),async(req,res)=>{
    try{
        const appointmentId=req.params.id
        const prescription=await Prescription.find({appointment:appointmentId})
        return res.status(200).json(prescription)
    }catch(e){
        return res.status(500).json(e)
    }
   
})



export default router