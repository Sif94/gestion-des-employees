import Departement from "../models/departementModel.js";
import Employee from "../models/employeeModel.js";
import asyncHandler from "express-async-handler";
import validator from "validator"

// ajouter un département

const addDepartement = asyncHandler(async (req, res) => {
    try {
        const { nom, description, emplacement, chef_departement } = req.body;

        if(!nom || !description || !emplacement || !chef_departement){
            throw Error('Veuillez remplir tous les champs')
        }
        const savedChefDepartement = await Employee.findById(chef_departement);
        if(!savedChefDepartement){
            throw Error('Le chef du département n\'existe pas')
        }
        if(!validator.isLength(nom, { min: 2, max: 50 }) || !validator.isLength(description, { min: 5, max: 500 })){
            throw Error('Le nom et la description doivent contenir entre 2 et 50 caractères')
        }
        const departement = await Departement.create({
            nom, 
            description,
            emplacement,
            chef_departement
        })
        departement.employees.push(chef_departement)
        await departement.save()
        res.status(201).json({success: true,departement: departement})
    }catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
})
// récupérer la liste des départements
const getDepartements = asyncHandler(async (req,res) => {
    try {
        const departements = await Departement.find();
        if (departements.length === 0) {
            res.status(404).json({
                success: false,
                error: "no departement found"
            })
        }else {
            res.status(200).json({
                success: true,
                count: departements.length,
                departements
            })
        }
        
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})
// récupérer un departement avec son id
const getDepartementById = asyncHandler(async (req,res) => {
    try {
        const departement = await Departement.findById(req.params.id);
        if (departement) {
            res.status(200).json({
                success: true,
                departement
            })
        } else {
            res.status(404).json({
                success: false,
                error: "departement not found"
            })
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})
// update departement
const updateDepartement = asyncHandler(async (req,res) => {
    try {
        const departement = await Departement.findById(req.params.id)
        if(departement){
            departement.nom = req.body.nom || departement.nom
            departement.description = req.body.description || departement.description
            departement.chef_departement = req.body.chef_departement || departement.chef_departement
            const updatedDepartement = await departement.save()
            res.status(200).json({
                success: true,
                updatedDepartement: updatedDepartement
            })
        }else{
            res.status(404).json({
                success: false,
                error: "departement not found"
            })
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
})

const deleteDepartement = asyncHandler(async (req,res)=>{
    try {
        const departement = await Departement.findById(req.params.id)
        if(departement){
            const deletedDepartement = await Departement.findByIdAndDelete(req.params.id)
            res.status(200).json({
                success: true,
                deletedDepartement: deletedDepartement
            })
        }else {
            res.status(404).json({
                success: false,
                error: "departement not found"
            })
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
})



export {
    addDepartement,
    getDepartements,
    getDepartementById,
    updateDepartement,
    deleteDepartement
}