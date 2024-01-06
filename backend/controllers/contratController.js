import asyncHandler from 'express-async-handler'
import Contrat from '../models/contratModel.js'
import validator from 'validator'
import puppeteer from 'puppeteer'
import fs from 'fs'

const getAllContrats = asyncHandler(async (req, res) => {
    try {
        const contrats = await Contrat.find()
        res.status(200).json(contrats)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

const getContratByID = asyncHandler(async (req, res) => {
        const contrat = await Contrat.findById(req.params.id)
        if (!contrat) {
            res.status(400)
            throw Error('Ce contrat n\'existe pas')
        }
        res.status(200).json(contrat)
})

const addContrat = asyncHandler(async (req, res) => {
    const redacteur = req.employee._id
    const {type_contrat, date_debut, date_fin, salaire_convenu, employee} = req.body
    if(!validator.isIn(type_contrat, ['CDI', 'CDD', 'Stage']) || !date_debut || !date_fin || !validator.isNumeric(salaire_convenu) || !employee){
        res.status(400)
        throw Error('Veuillez remplir tous les champs')
    }
    const contrat = await Contrat.create({type_contrat, date_debut, date_fin, salaire_convenu, employee, redacteur})
    res.status(201).json(contrat)
})


const updateContratById = asyncHandler(async(req,res)=>{
    const contrat = await Contrat.findById(req.params.id)
    if(!contrat){
        res.status(400)
        throw Error('Ce contrat n\'existe pas')
    }
    const redacteur = req.employee._id
    const {type_contrat, date_debut, date_fin, salaire_convenu, employee} = req.body
    contrat.type_contrat = type_contrat || contrat.type_contrat
    contrat.date_debut = date_debut || contrat.date_debut
    contrat.date_fin = date_fin || contrat.date_fin
    contrat.salaire_convenu = salaire_convenu || contrat.salaire_convenu
    contrat.employee = employee || contrat.employee
    contrat.redacteur = redacteur || contrat.redacteur
    const updatedContrat = await contrat.save()
    res.status(200).json(updatedContrat)
})

const deleteContratById = asyncHandler(async(req,res)=>{
    const contrat = await Contrat.findById(req.params.id)
    if(!contrat){
        res.status(400)
        throw Error('Ce contrat n\'existe pas')
    }
    const deletedContrat = await Contrat.findByIdAndDelete(req.params.id)
    res.status(200).json({message:'Contrat supprimé'})
})


const getEmployeeContrats = asyncHandler(async (req,res) => {
    const contrats = await Contrat.find({employee: req.params.id})
    res.status(200).json(contrats)
})


const getEmployeeContratsRediges = asyncHandler(async (req,res) => {
    const contrats = await Contrat.find({redacteur: req.employee._id})
    res.status(200).json(contrats)
})

const printContrat = asyncHandler(async (req, res) => {
    console.log(req.params)
    const {id} = req.params
    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();
    await page.goto(`http://localhost:3000/login`);
    await page.type('#username', 'admin');
    await page.type('#password', 'password');
    await page.click('[type=submit]');


    await page.waitForTimeout(15000) 
    await page.goto(`http://localhost:3000/dashboard/contrats/${id}/details`,{ waitUntil: 'networkidle2' });
    

    const now = Date.now()
    await page.pdf({path: `documents/contrat-${id}-${now}.pdf`, format: 'A4'});
    res.download(`./documents/contrat-${id}-${now}.pdf`);

    
    await browser.close();
    fs.unlink(`./documents/contrat-${id}-${now}.pdf`, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('File is deleted.');
        }
      });
      

})
export {
    getAllContrats,
    getContratByID,
    addContrat,
    updateContratById,
    deleteContratById,
    getEmployeeContrats,
    getEmployeeContratsRediges,
    printContrat
}