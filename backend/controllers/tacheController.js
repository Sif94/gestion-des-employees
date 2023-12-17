import asyncHandler from 'express-async-handler'
import Tache from '../models/tacheModel.js'
import validator from 'validator'


const getAllTaches = asyncHandler(async (req, res) => {

    try {
        const taches = await Tache.find({})
        res.json(taches)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

const getTacheById = asyncHandler(async (req, res) => {

    try {
        const tache = await Tache.findById(req.params.id)
        if (!tache) {
            res.status(400)
            throw Error('Tache not found')
        } else {
            res.json(tache)
        }
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

const createTache = asyncHandler(async (req, res) => {
    try {
        const {titre, description, date_debut, date_fin} = req.body
        const redacteur = req.employee._id
        const tache = await Tache.create({
            titre,
            description,
            date_debut,
            date_fin,
            redacteur
        })
        res.json(tache)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    

})

const updateTacheById = asyncHandler(async (req, res) => {

    try {
        const tache = await Tache.findById(req.params.id)
        if (!tache) {
            res.status(400)
            throw Error('Tache not found')
        }
        const redacteur = req.employee._id
        const {titre, description, date_debut, date_fin} = req.body
        tache.titre = titre || tache.titre
        tache.description = description || tache.description
        tache.date_debut = date_debut || tache.date_debut
        tache.date_fin = date_fin || tache.date_fin
        tache.redacteur = redacteur
        await tache.save()
        res.json(tache)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
 

})
const deleteTacheById = asyncHandler(async (req, res) => {

    try {
        const tache = await Tache.findByIdAndDelete(req.params.id)
        if (!tache) {
            res.status(404)
            throw Error('Tache not found')
        }
        res.json(tache, { message: 'Tache supprimé' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
export {
    getAllTaches,
    getTacheById,
    createTache,
    updateTacheById,
    deleteTacheById
}