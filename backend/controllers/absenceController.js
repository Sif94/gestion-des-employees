import Absence from "../models/absenceModel.js";
import asyncHandler from "express-async-handler";
import validator from "validator";
import Employee from "../models/employeeModel.js";
import mongoose from "mongoose"

const createAbsence = asyncHandler(async (req, res) => {
    try {
        const signaleur = req.employee._id
        const {date_absence, motif, justifiee, employee} = req.body
        const savedEmployee = await Employee.findById(employee)
        if(!savedEmployee){
            throw Error('Employee not found')
        }
        if(!employee || !date_absence || !motif || !justifiee){
            throw Error('Veuillez remplir tous les champs')
        }

        const absence = await Absence.create({
            employee,
            signaleur,
            date_absence,
            motif,
            justifiee
        })
        const savedAbsenceId = absence._id
        const updatedEmployee = await Employee.findByIdAndUpdate(employee,{ $push: { absences: new mongoose.Types.ObjectId(savedAbsenceId) } },
        { new: true })
        const updatedSignaleur = await Employee.findByIdAndUpdate(signaleur,{ $push: { absences_redige: new mongoose.Types.ObjectId(savedAbsenceId) } },
        { new: true })
        res.status(201).json({absence, updatedEmployee, updatedSignaleur})
    } catch (error) {
        res.status(400).json({
            message: `Une erreur survenue: ${error.message}`
        })
    }
   
})

const getAllAbsence = asyncHandler(async(req,res)=>{
    try {
        const absences = await Absence.find()
        res.status(200).json(absences)
    } catch (error) {
        res.status(400).json({message: `Une erreur survenue: ${error.message}`})
    }
})
const getAbsence = asyncHandler(async(req,res) => {
    try {
        const absence = await Absence.findById(req.params.id)
        if(!absence){
            throw Error('Cette absence n\'existe pas')
        } 
        const signaleur = await Employee.findById(absence.signaleur).select('-password')
        const employee = await Employee.findById(absence.employee).select('-password')
        res.status(200).json({absence, signaleur, employee})
    }catch(error){
        res.status(400).json({
            message: `Une erreur survenue: ${error.message}`})
    }
})

const updateAbsence = asyncHandler(async(req,res)=>{
    try {
        const absenceId = req.params.id
        const signaleur = req.employee._id
        const absence = await Absence.findById(absenceId)
        absence.employee = req.body.employeeId || absence.employee
        absence.date_absence = req.body.date_absence || absence.date_absence
        absence.motif = req.body.motif || absence.motif
        absence.justifiee = req.body.justifiee || absence.justifiee
        absence.signaleur = signaleur
        await absence.save()
        res.status(200).json({
            absence
        })
    } catch (error) {
        res.status(400).json({
            message: `Une erreur survenue: ${error.message}`
        })
    }
})

const deleteAbsence = asyncHandler(async(req,res)=>{
    try {
        const absenceId = req.params.id
        const savedAbsence = await Absence.findById(absenceId)
        if(!savedAbsence){
            throw Error("L'absence n'existe pas")
        }
        const employee = savedAbsence.employee
        const signaleur = savedAbsence.signaleur
        await Employee.updateOne({ _id: employee },{ $pull: { absences: savedAbsence._id } });
        await Employee.updateOne({ _id: signaleur },{ $pull: { absences_redige: savedAbsence._id } });
        const deletesAbsence = await Absence.deleteOne({_id: absenceId})
        res.status(200).json({
            message: "L'absence a été supprimé",
        })
    } catch (error) {
        res.status(400).json({
            message: `Une erreur est survenue: ${error.message}`
        })
    }
})

const getAllAbsencesRediges = asyncHandler(async(req,res)=>{
    try {
        const absences_rediges = await Absence.find({signaleur: req.employee._id})
        res.status(200).json({
            absences_rediges
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
})

export {
    createAbsence,
    getAbsence,
    updateAbsence, 
    deleteAbsence,
    getAllAbsence,
    getAllAbsencesRediges
}