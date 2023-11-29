import Absence from "../models/absenceModel.js";
import asyncHandler from "express-async-handler";
import validator from "validator";
import Employee from "../models/employeeModel.js";


const createAbsence = asyncHandler(async (req, res) => {
    try {
        const signaleur = req.employee._id
        const {date_absence, motif, justifiee, employeeId} = req.body
        const employee = await Employee.findById(employeeId)
        if(!employeeId || !date_absence || !motif || !justifiee || !employee){
            throw Error('Veuillez remplir tous les champs')
        }

        const absence = await Absence.create({
            employee: employeeId,
            signaleur,
            date_absence,
            motif,
            justifiee
        })
        const savedAbsenceId = absence._id
        employee.absences.push(savedAbsenceId)
        res.status(201).json({absence})
    } catch (error) {
        res.status(400).json({
            message: `Une erreur survenue: ${error.message}`
        })
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
        const deletesAbsence = await Absence.deleteOne({_id: absenceId})
        res.status(200).json({
            message: "L'absence a été supprimé",
            deletesAbsence
        })
    } catch (error) {
        res.status(400).json({
            message: `Une erreur est survenue: ${error.message}`
        })
    }
})



export {
    createAbsence,
    getAbsence,
    updateAbsence, 
    deleteAbsence
}