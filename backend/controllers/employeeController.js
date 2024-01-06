import Employee from "../models/employeeModel.js";
import asyncHandler from "express-async-handler";
import {generateToken, generateRefreshToken} from "../utils/generateToken.js";
import EmployeeArchive from "../models/employeeArchiveModel.js";
import Departement from "../models/departementModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import upload from "../config/multerConfig.js";
const getUsersPaginated = async (page) => {
    let resultsPerPage = 6
  
    const employees = await Employee.find({})
      .sort({ createdAt: 'asc' })
      .lean()
      .limit(resultsPerPage)
      .skip(page * resultsPerPage)
    const totalEmployees = await Employee.countDocuments({})
    const totalPages = Math.ceil(totalEmployees / resultsPerPage)
    return {
      employees,
      totalPages
    }
  }
 const getAllUsers = asyncHandler(async (req, res) => {
    let page = req.query.page || 0 //starts from 0
    let {employees, totalPages} =  await getUsersPaginated(page)
    if (employees && employees.length > 0) {
      res.json({employees, totalPages})
    } else {
      res.json("users not found")
    }
  })
// récupérer la listes des employés
const getEmployees = asyncHandler( async (req,res) => {
    try {
        const employees = await Employee.find({}).select('-password')
            res.status(200).json(employees)
    } catch (error) {
        console.log(error.message)
        res.json({message: error.message})
    }
})

// ajouter un employé
const addEmployee = asyncHandler( async (req, res) => {
    try {
        const {nom, prenom, email, username, password, sexe, date_naiss, type, post, situation_marital, telephone, departement, adresse} = req.body
        console.log(req.file.filename)
        const profileImage = req.file ? req.file.filename : null;
        if(
            !nom || 
            !prenom || 
            !email || 
            !username || 
            !password || 
            !sexe || 
            !date_naiss || 
            !type || 
            !post || 
            !departement ||
            !situation_marital || 
            !telephone ||
            !adresse ||
            !validator.isAlpha(nom, 'fr-FR', {ignore: ' -'}) || 
            !validator.isAlpha(prenom, 'fr-FR', {ignore: ' -'}) || 
            !validator.isAlpha(post, 'fr-FR', {ignore: ' -'}) || 
            !validator.isDate(date_naiss, {format: 'YYYY-MM-DD'}) || 
            !validator.isIn(situation_marital,['Married', 'Divorced', 'Single', 'Separated', 'Widowed']) || 
            !validator.isIn(type, ['Admin', 'Chef_De_Projet', 'Employee', 'RH', 'Chef_De_Departement']) || 
            !validator.isEmail(email)
            ){
            throw Error('Veuillez saisir des champs valides')
        }
            

        // if(!validator.isStrongPassword(password)){
        //     throw Error('Mot de passe trop faible')
        // }
        if(departement){
            const savedDepartement = await Departement.findById(departement)

            if(!savedDepartement){
                throw Error('Departement non trouvé')
            }
        }
       

        const employee = await Employee.findOne({ $or: [{ email: email }, { username: username }, { telephone: telephone }] })

        if (employee) {
            throw Error("Employee existe déja");
        } else {
            const savedEmployee = await Employee.create({nom, prenom, email, username, password, sexe, date_naiss, type, post, situation_marital, telephone, departement, adresse, profileImage})

            const savedEmployeeId = savedEmployee._id

            await Departement.findByIdAndUpdate(departement, { $push: { employees: savedEmployeeId } }, { new: true })

            res.status(201).json({savedEmployee})
        }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: `Erreur: ${error.message}` })
    }
});

// authentifier un employé
const authEmployee = asyncHandler( async (req,res) => {
    try {
        const {username, password} = req.body
        if(!username || !password){
            throw Error('Tous les champs sont obligatoires')
        }
        if(!validator.isLength(username, {min: 3, max: 15})){
            throw Error('Username invalide: entre 3 et 15 caractères')
        }

        const employee = await Employee.findOne({username})
        console.log(employee)
        if(employee && (await employee.isCorrectPassword(password))){
            generateToken(res,employee._id)
            generateRefreshToken(res,employee._id)
            res.status(200).json({
                success: true
            })
        }else {
            res.status(400)
            throw new Error("Invalid Credentials")
        }
    } catch (error) {
        res.status(400).json({ message: `Erreur: ${error.message}` })
        console.log(error.message)
    }
})

// Se déconnecter d'une session 
const logoutEmployee = asyncHandler( async (req,res) => {
    try {
        res.cookie('token', '', {expires: new Date(Date.now()), httpOnly: true})
        res.cookie('refreshToken', '', {expires: new Date(Date.now()), httpOnly: true})
        return res.status(200).json({
            message: "logged out with successe"
        })
    } catch (error) {
        res.status(400).json({ message: `Erreur: ${error.message}` })
    }
}) 
// Modifier les informations d'un employé
const updateEmployee = asyncHandler( async (req,res) => {
    try {
        const employee = await Employee.findById(req.params.id)
        console.log(req.file)
        const profileImage = req.file ? req.file.filename : null;
        if(
            !validator.isAlpha(req.body.nom, 'fr-FR', {ignore: ' -'}) ||
             !validator.isAlpha(req.body.prenom, 'fr-FR', {ignore: ' -'}) || 
             !validator.isAlpha(req.body.post, 'fr-FR', {ignore: ' -'})){
            throw Error('Nom, prénom et poste ne doivent pas contenir de caractères spéciaux')
        }

        if(req.body.email){
            if(!validator.isEmail(req.body.email)){
                throw Error('Email invalide')
            }
        }
        if(req.body.password){
            if(!validator.isStrongPassword(req.body.password)){
                throw Error('Mot de passe trop faible')
            }
        }
        
    if (employee) {
        employee.nom = req.body.nom || employee.nom
        employee.prenom = req.body.prenom || employee.prenom
        employee.email = req.body.email || employee.email
        employee.username = req.body.username || employee.username
        employee.password = req.body.password || employee.password
        employee.type = req.body.type || employee.type
        employee.date_naiss = req.body.date_naiss || employee.date_naiss
        employee.sexe = req.body.sexe || employee.sexe
        employee.situation_marital = req.body.situation_marital || employee.situation_marital
        employee.telephone = req.body.telephone || employee.telephone
        employee.post = req.body.post || employee.post
        employee.adresse = req.body.adresse || employee.adresse
        employee.departement = req.body.departement || employee.departement
        employee.profileImage = profileImage || employee.profileImage
        const updatedEmployee = await employee.save()
        res.status(200).json({
            updateEmployee: updatedEmployee
        })
    } else {
        throw Error("Employee not found")        

    }
    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            error: error.message
        })
    }
    })
// 
const getEmployeeData = asyncHandler(async (req,res) => {
    const employee = await Employee.findById(req.params.id)
    if (employee) {
        res.status(200).json(employee)
    }else {
        res.status(404).json({
            message: "Employee not found"
        })
        throw new Error("Employee not found") 
    }
})
// Supprression et l'archivage d'un employé
const deleteEmployee = asyncHandler(async (req,res) => {
    const employee = await Employee.findById(req.params.id)
    if (employee) {
        const archivedEmployeeInfo = await EmployeeArchive.create({
            _id: employee._id,
            username: employee.username,
            email: employee.email,
            date_naiss: employee.date_naiss,
            nom: employee.nom,
            prenom: employee.prenom,
            sexe: employee.sexe,
            departement: employee.departement,
            telephone: employee.telephone,
            post: employee.post,
            type: employee.type,
            situation_marital: employee.situation_marital,
            adresse: employee.adresse,
            departement: employee.departement,
            createdAt: employee.createdAt,
            updatedAt: employee.updatedA,            
        })
        
        try {
            
            const deletedEmployee = await Employee.findByIdAndDelete(employee._id)
            if(deletedEmployee){
                res.status(200).json({
                    message: "Employee deleted successfully",
                    deleteEmployee
                }
                )
            } else {
                res.status(400)
                throw new Error("Employee not deleted")
            }
        } catch(error) {
            cosole.log(error.message)
           res.json({ message: `Erreur: ${error.message}` })
        }
        
    }else {
        res.status(404).json({
            message: "Employee not found"
        })
    }
})

const getEmployeesByDepartement = asyncHandler(async(req,res)=>{
    try {
        const employees = await Employee.find({departement: req.params.id})
        res.status(200).json(employees)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

const getProfile = asyncHandler(async(req,res)=>{
    try {
        const employee = await Employee.findById(req.employee._id).select('-password').populate('departement')
        console.log(employee)
        res.status(200).json(employee)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


// Generate a function to generate a refresh token

const generateEmployeeRefreshToken = asyncHandler(async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken
        console.log(refreshToken)
        if(!refreshToken){
            res.status(400)
            throw new Error("No refresh token")
        }
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
        if(!decoded){
            res.status(400)
            throw new Error("Invalid refresh token")
        }
        generateToken(res,decoded._id)
        res.status(200).json({
            message: "Refresh token generated successfully"
        })
    } catch (error) {
        console.log(error.message)
        res.json({ message: `Erreur: ${error.message}` })
    }

   
})
export {
    addEmployee,
    getEmployees,
    authEmployee,
    logoutEmployee,
    updateEmployee,
    getEmployeeData,
    deleteEmployee,
    getProfile,
    generateEmployeeRefreshToken,
    getEmployeesByDepartement,
    getAllUsers
}