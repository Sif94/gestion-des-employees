import Retard from "../models/retardModel.js"
import validator from "validator"
import Employee from "../models/employeeModel.js"
import asyncHandler from "express-async-handler"
import mongoose from "mongoose"


const createRetard = asyncHandler(async (req, res) => {
    try {
        const signaleur = req.employee._id
        const {date_retard, motif, justifiee, employee} = req.body
        if(!date_retard || !motif || !justifiee || !employee || !validator.isLength(motif, {min: 5, max: 100}), !validator.isDate(date_retard)){
            throw Error('Veuillez remplir tous les champs correctement')
        }
        const savedEmployee = await Employee.findById(employee)

        const signaleurEmployee = await Employee.findById(signaleur)
        if(!savedEmployee){
            throw Error('Cet employé n\'existe pas')
        }
       
        const retard = await Retard.create({
            employee,
            signaleur,
            date_retard,
            motif,
            justifiee
        })

        const savedRetardId = retard._id
        console.log(savedRetardId)

        const eupdatedEmployee = await Employee.findByIdAndUpdate(employee,{ $push: { retards: new mongoose.Types.ObjectId(savedRetardId) } },
        { new: true })
        const eupdatedSignaleur = await Employee.findByIdAndUpdate(signaleur,{ $push: { retards_redige: new mongoose.Types.ObjectId(savedRetardId) } },
        { new: true })

        res.status(201).json({retard})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            message: `Une erreur survenue: ${error.message}`
        })
    }
   
})

const getRetardById = asyncHandler(async(req,res) => {
    try {
        const retard = await Retard.findById(req.params.id)
        if(!retard){
            throw Error('Cette retard n\'existe pas')
        } 
        const signaleur = await Employee.findById(retard.signaleur).select('-password')
        const employee = await Employee.findById(retard.employee).select('-password')
        res.status(200).json({retard, signaleur, employee})
    }catch(error){
        res.status(400).json({
            message: `Une erreur survenue: ${error.message}`})
    }
})
// Tous les retards d'un employé donné
const getAllRetardsByEmployeeId = asyncHandler(async(req,res) => {
    try {
        const savedEmployee = await Employee.findById(req.params.id)
        if(!savedEmployee){
            throw Error('Cet employé n\'existe pas')
        }
        const retards = await Retard.find({employee: savedEmployee._id })
        res.status(200).json(retards)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


const getAllRetards = asyncHandler(async(req,res)=>{
    try {
        const retards = await Retard.find()
        res.status(200).json({retards})
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
const getAllRetardsRediges = asyncHandler(async(req,res)=>{
    try {
        const savedRetards = await Retard.find({signaleur: req.employee._id})

        // for await (let retard_id of retards_id) {
        //     let savedRetard = await Retard.findById(retard_id)
        //     retards.push(savedRetard)
        // }
        res.status(200).json(savedRetards)
    } catch (error) {
        res.status(400).json({
            erreur: error.message
        })
    }
})
const updateRetardById = asyncHandler(async(req,res)=>{
    try {
        const savedRetard = await Retard.findById(req.params.id)
        if(!savedRetard){
            throw Error('Ce retard n\'existe pas')
        }
        savedRetard.signaleur = req.employee._id || savedRetard.signaleur
        savedRetard.date_retard = req.body.date_retard || savedRetard.date_retard
        savedRetard.justifiee = req.body.justifiee || savedRetard.justifiee
        savedRetard.motif = req.body.motif || savedRetard.motif
        savedRetard.employee = req.employee._id || savedRetard.employee
        const updatedRetard = await savedRetard.save()
        res.status(200).json({
            updatedRetard
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

const deleteRetardById = asyncHandler(async(req,res)=>{
    try {
        const savedRetard = await Retard.findById(req.params.id)
        if(!savedRetard){
            throw Error('Ce retard n\'existe pas')
        }
        const employee = savedRetard.employee
        const signaleur = savedRetard.signaleur
        await Employee.updateOne({ _id: employee },{ $pull: { retards: savedRetard._id } });
        await Employee.updateOne({ _id: signaleur },{ $pull: { retards_redige: savedRetard._id } });
        await Retard.deleteOne({ _id: req.params.id })
        res.status(200).json({message: 'Retard supprimé'}) 
    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
})
export {
    createRetard,
    getRetardById,
    getAllRetards,
    getAllRetardsRediges,
    getAllRetardsByEmployeeId,
    updateRetardById,
    deleteRetardById
}