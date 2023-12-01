import validator from 'validator';
import asyncHandler from 'express-async-handler'
import Conge from '../models/congeModel.js';
import Employee from '../models/employeeModel.js';

const getAllConges = asyncHandler(async(req,res)=> {
    try {
        const conges = await Conge.find();
        if(!conges){
            throw Error('Pas de congé trouvé')
        }
        res.status(200).json(conges)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

const getCongeById = asyncHandler(async(req,res)=>{
    try {
        const conge = await Conge.findById(req.params.id);
        if(!conge){
            throw Error('Ce congé n\'existe pas')
        }
        res.status(200).json(conge)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})


const addConge = asyncHandler(async(req,res)=>{
    try {
        const redacteur = req.employee._id
        const {date_debut, date_fin, motif, employee, type_conge} = req.body
        if(!validator.isDate(date_debut) || !validator.isDate(date_fin) || !validator.isLength(motif,{min:5,max:1000}) || !validator.isIn(type_conge,['Congé payé','Congé non payé'])){
            throw Error('Veuillez vérifier vos paramètres')
        }else{
            const conge = await Conge.create({date_debut, date_fin, motif, employee, type_conge, redacteur})
            res.status(201).json(conge)
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


const updateCongeById = asyncHandler(async(req,res)=>{
    try {
        const coongeId = req.params.id
        const redacteur = req.employee._id
        const {date_debut, date_fin, motif, employee, type_conge} = req.body
        const savedConge = await Conge.findById(coongeId)
        if(!savedConge){
            throw Error('Ce congé n\'existe pas')
        }else{
            savedConge.date_debut = date_debut || savedConge.date_debut
            savedConge.date_fin = date_fin || savedConge.date_fin
            savedConge.motif = motif || savedConge.motif
            savedConge.employee = employee || savedConge.employee
            savedConge.type_conge = type_conge || savedConge.type_conge
            savedConge.redacteur = redacteur || savedConge.redacteur
            const updatedConge = await savedConge.save()
            res.status(200).json({
                message: 'Conge modifié avec succès',
                updatedConge
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


const deleteCongeById = asyncHandler(async(req,res)=>{
    try {
        const conge = await Conge.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Conge supprimé avec succès',
            conge
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})



const getCongesByEmployeeId = asyncHandler(async(req,res)=>{
    try {
        const employeeConges = await Conge.find({employee: req.params.id})
        res.status(200).json({
            employeeConges
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

const getCongesRediges = asyncHandler(async(req,res)=>{
    try {
        const congesRediges = await Conge.find({redacteur: req.employee.id})
        let conges = [];
        for await (const congeRedige of congesRediges){
            const employee = await Employee.findById(congeRedige.employee).select('-password')
            conges.push({congeRedige, employee})
        }
        res.status(200).json({
            conges
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

export {
    getAllConges,
    getCongeById,
    addConge,
    updateCongeById,
    deleteCongeById,
    getCongesByEmployeeId,
    getCongesRediges
}