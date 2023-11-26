import Employee from "../models/employeeModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import EmployeeArchive from "../models/employeeArchiveModel.js";

// récupérer la listes des employés
const getEmployees = asyncHandler( async (req,res) => {
    try {
        const employees = await Employee.find().select('-password')
        if (employees.length === 0) {
            res.status(200).json({message: "0 employées", employees})
        } else {
            res.status(200).json({count: employees.length, employees})
        }
    } catch (error) {
        console.log(error.message)
    }
})


// ajouter un employé
const addEmployee = asyncHandler( async (req, res) => {
    try {
        const {nom, prenom, email, username, password, sexe, date_naiss, type, post, situation_marital, telephone} = req.body
        const employee = await Employee.findOne({ $or: [{ email: email }, { username: username }, { telephone: telephone }] })
        if (employee) {
            res.status(400);
            throw new Error("Employee already exist");
        } else {
            const savedEmployee = await Employee.create({nom, prenom, email, username, password, sexe, date_naiss, type, post, situation_marital, telephone})
            res.status(201).json(savedEmployee)
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server Error" })
    }
});

// authentifier un employé
const authEmployee = asyncHandler( async (req,res) => {
    try {
        const {username, password} = req.body
        const employee = await Employee.findOne({username})
        console.log(employee)
        if(employee && (await employee.isCorrectPassword(password))){
            generateToken(res, employee._id)
            res.status(200).json({
                id: employee._id,
                type: employee.type
            })
        }else {
            res.send(401)
            throw new Error("Invalid Credentials")
        }
    } catch (error) {
        console.log(error.message)
    }
})

// Se déconnecter d'une session 
const logoutEmployee = asyncHandler( async (req,res) => {
    try {
        res.cookie('token', '', {expires: new Date(Date.now()), httpOnly: true})
        return res.status(200).json({
            message: "logged out with successe"
        })
    } catch (error) {
        console.log(error.message)
        res.send(500)
        throw new Error('Server error')
    }
})
// Modifier les informations d'un employé
const updateEmployee = asyncHandler( async (req,res) => {
    const employee = await Employee.findById(req.params.id)

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
        const updatedEmployee = await employee.save()
        res.status(200).json({
            _id: updatedEmployee._id,
            username: updatedEmployee.username,
            email: updatedEmployee.email,
        })
    } else {
        res.status(404).json({
            message: "Employee not found"
        })
        throw new Error("Employee not found")

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
            updatedAt: employee.updatedAt
        })
        
        try {
            const archivedEmpoyee = await EmployeeArchive.create(archivedEmployeeInfo)
            const deletedEmployee = await Employee.findByIdAndDelete(req.params.id)
            if(deletedEmployee){
                res.status(200).json({
                    message: "Employee deleted successfully"
                }
                )
            } else {
                res.status(500).json({
                    message: "Employee not deleted"
                })
                throw new Error("Employee not deleted")
            }
        } catch(error) {
           
        }
        
    }else {
        res.status(404).json({
            message: "Employee not found"
        })
    }
})
export {
    addEmployee,
    getEmployees,
    authEmployee,
    logoutEmployee,
    updateEmployee,
    getEmployeeData,
    deleteEmployee
}