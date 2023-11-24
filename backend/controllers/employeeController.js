import Employee from "../models/employeeModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

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
            message: "Logout User"
        })
    } catch (error) {
        console.log(error.message)
        res.send(500)
        throw new Error('Server error')
    }
})
export {
    addEmployee,
    getEmployees,
    authEmployee,
    logoutEmployee
}