import Departement from "../models/departementModel.js";
import asyncHandler from "express-async-handler";


// ajouter un département

const addDepartement = asyncHandler(async (req, res) => {
    try {
        const { nom, description, emplacement, chef_departement } = req.body;
        const departement = await Departement.create({
            nom, 
            description,
            emplacement,
            chef_departement
        })
        if(departement){
            res.status(201).json({
                success: true,
                departement: departement
            }
            )
        }else {
            res.status(400).json({
                error: "departement not added"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
        throw new Error(error.message)
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
        res.status(500).json(error.message)
        throw new Error('Server error')
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
        res.status(500).json(error.message)
    }
})



export {
    addDepartement,
    getDepartements,
    getDepartementById,
    updateDepartement,
    deleteDepartement
}