import Projet from "../models/projetModel.js";
import validator from "validator"
import asyncHandler from 'express-async-handler'
import Employee from "../models/employeeModel.js";
import Departement from "../models/departementModel.js"
import { response } from "express";

const getAllProjets = asyncHandler(async(req,res)=>{
    try {
        const projets = await Projet.find() 
        res.status(200).json({
            projets: projets
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
 
const addProjet = asyncHandler(async(req,res)=>{
    try {
        const {titre, description, date_debut, date_fin, employees, chef_projet, departements, duree} = req.body 
        if(!titre || !description || !date_debut || !date_fin || !duree || !validator.isDate(date_debut) || !validator.isDate(date_fin) || !chef_projet){
            res.status(400)
            throw Error('Veuillez remplir tous les champs') 
        }
        const projet = await Projet.create({titre, description, date_debut, date_fin, chef_projet, duree})
        if(employees){
             employees.map(async (employee) => {
                projet.employees.push(employee)
           })
        }
        if(departements){
             departements.map(async (departement) => {
                projet.departements.push(departement) 
           })
        }
        
        const projetData = await projet.save()
        console.log(projetData)
        const projetResponse = await Projet.findById(projetData._id).select('-employees -departements')
        const departementsData = await Departement.find({ _id: { $in: projetData.departements } });
        console.log(departementsData)
        const employeesData = await Employee.find({ _id: { $in: projetData.employees } });
        const response = projetResponse

        response.departements = departementsData
        response.employees = employeesData

        res.status(200).json({
            projet:response
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

const getProjetById = asyncHandler(async(req,res)=>{
    try {
        const projet = await Projet.findById(req.params.id)
        if(!projet){
            res.status(404)
            throw Error('Ce projet n\'existe pas')
        }
        res.status(200).json(projet)
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})  

const updateProjetById = asyncHandler(async(req,res)=>{
    try {
        const projet = await Projet.findById(req.params.id)
        if(!projet){
            res.status(404)
            throw Error('Ce projet n\'existe pas')
        }
        const savedEmployees = await Employee.find({ _id: { $in: projet.employees } });  
        const savedDepartements = await Departement.find({ _id: { $in: projet.departements } });

        projet.titre = req.body.titre || projet.titre
        projet.description = req.body.description || projet.description
        projet.date_debut = req.body.date_debut || projet.date_debut
        projet.date_fin = req.body.date_fin || projet.date_fin
        projet.duree = req.body.duree || projet.duree
        projet.chef_projet = req.body.chef_projet || projet.chef_projet
        projet.employees = req.body.employees || projet.employees
        projet.departements = req.body.departements || projet.departements

        const updatedProjet = await projet.save()      
        
       savedEmployees.map(async(employee) => {
           if(employee.projets.includes(updatedProjet._id)){
                let savedEmployee = await Employee.findByIdAndUpdate(employee._id, {$pull: {projets: projet._id}})
           }else{
                let savedEmployee = await Employee.findByIdAndUpdate(employee._id, {$push: {projets: projet._id}})
           }
       })
       savedDepartements.map(async(departement) => {
           if(departement.projets.includes(updatedProjet._id)){
                let savedDepartement = await Departement.findByIdAndUpdate(departement._id, {$pull: {projets: projet._id}})
           }else{
                let savedDepartement = await Departement.findByIdAndUpdate(departement._id, {$push: {projets: projet._id}})
           }
       })
        res.status(200).json(updatedProjet)
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

const deleteProjetById = asyncHandler(async(req,res)=>{
    try {
        const projet = await Projet.findById(req.params.id)
        if(!projet){
            res.status(404)
            throw Error('Ce projet n\'existe pas')
        }
        const employees = await Employee.find({ _id: { $in: projet.employees } });
        const departements = await Departement.find({ _id: { $in: projet.departements } });
        employees.map(async(employee) => {
            let savedEmployee = await Employee.findByIdAndUpdate(employee._id, {$pull: {projets: projet._id}})
        })
        departements.map(async(departement) => {
            let savedDepartement = await Departement.findByIdAndUpdate(departement._id, {$pull: {projets: projet._id}})
        })

        const deletedProjet = await Projet.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Projet supprimé'})

    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

const getProjectByEmployeeId = asyncHandler(async(req,res)=>{
    try {
        const projects = await Projet.find({ employees: { $in: req.params.id } }).populate('chef_projet departements');
        res.status(200).json(projects)
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})
export {
    getAllProjets,
    addProjet,
    getProjetById,
    updateProjetById,
    deleteProjetById,
    getProjectByEmployeeId
}