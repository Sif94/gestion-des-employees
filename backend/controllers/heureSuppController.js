import asyncHandler from 'express-async-handler'
import validator from 'validator'
import HeureSupplementaire from '../models/heureSuppModel.js'


const getAllHeureSupplementaires = asyncHandler(async (req, res) => {
    try {
        const HeureSupplementaires = await HeureSupplementaire.find()
        res.status(200).json(HeureSupplementaires)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
const getHeureSupplementaireById = asyncHandler(async (req, res) => {
    try {
        const HeureSupplementaire = await HeureSupplementaire.findById(req.params.id)
        res.status(200).json(HeureSupplementaire)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})
const createHeureSupplementaire = asyncHandler(async (req, res) => {
   try {
    const {date_h_supp, duree, description, supp_perm, tarif, employee} = req.body
    const redacteur = req.employee._id
    const newHeureSupplementaire = await HeureSupplementaire.create({date_h_supp, duree, description, supp_perm, tarif, employee, redacteur})
    res.status(201).json(newHeureSupplementaire)
   } catch (error) {
    res.status(400).json({
        message: error.message
    })
   }
})

const updateHeureSupplementaireById = asyncHandler(async (req, res) => {
    try {
        const {date_h_supp, duree, description, supp_perm, tarif, employee} = req.body
        const redacteur = req.employee._id
        const updatedHeureSupplementaire = await HeureSupplementaire.findById(req.params.id)
        updatedHeureSupplementaire.date_h_supp = date_h_supp || updatedHeureSupplementaire.date_h_supp
        updatedHeureSupplementaire.duree = duree || updatedHeureSupplementaire.duree
        updatedHeureSupplementaire.description = description || updatedHeureSupplementaire.description
        updatedHeureSupplementaire.supp_perm = supp_perm || updatedHeureSupplementaire.supp_perm
        updatedHeureSupplementaire.tarif = tarif || updatedHeureSupplementaire.tarif
        updatedHeureSupplementaire.employee = employee || updatedHeureSupplementaire.employee
        updatedHeureSupplementaire.redacteur = redacteur || updatedHeureSupplementaire.redacteur
        await updatedHeureSupplementaire.save()
        res.status(200).json(updatedHeureSupplementaire)
        
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

const deleteHeureSupplementaireById = asyncHandler(async (req, res) => {
    try {
        const deletedHeureSupplementaire = await HeureSupplementaire.findByIdAndDelete(req.params.id)
        if (!deletedHeureSupplementaire) {
            res.status(404)
            throw Error('HeureSupplementaire not found')
        } else {
            res.status(200).json(deletedHeureSupplementaire, {message: 'HeureSupplementaire supprimé'})
        }
    } catch (error) {
        res.json({message: error.message})
    }
})
export {
    getAllHeureSupplementaires,
    getHeureSupplementaireById,
    createHeureSupplementaire,
    updateHeureSupplementaireById,
    deleteHeureSupplementaireById
}