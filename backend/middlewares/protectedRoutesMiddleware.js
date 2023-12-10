import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";


const isAuth = asyncHandler( async (req, res, next) => {
        let token;
            try {
                token = req.cookies.token
                if(!token){
                    throw Error('Veuillez vous authentifier: Pas de token')
                }
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.employee = await Employee.findById(decoded._id);
                // console.log(req.employee)
                next()
            } catch (error) {
                res.status(401).json({ message: `Token Invalide: ${error.message}` });
            }
        
})
const isAdmin = asyncHandler( async(req,res,next) => { 
    if(req.employee.type === 'Admin'){
        next()
    }else {
        res.status(403).json({
            message:'Non autorisé: pas de droit'
        })
        throw new Error('Non autorisé: pas de droit')
    }
})
const isChefDeDepartement = asyncHandler( async(req,res,next) => { 
    if(req.employee.type === 'Chef_De_Departement'){
        next()
    }else {
        res.status(403).json({
            message:'Non autorisé: pas de droit'
        })
        throw new Error('Non autorisé: pas de droit')
    }
})
const isChefDeProjet = asyncHandler( async(req,res,next) => { 
    if(req.employee.type === 'Chef_De_Projet'){
        next()
    }else {
        res.status(403).json({
            message:'Non autorisé: pas de droit'
        })
        throw new Error('Non autorisé: pas de droit')
    }
})
const isRH = asyncHandler( async(req,res,next) => { 
    if(req.employee.type === 'RH'){
        next()
    }else {
        res.status(403).json({
            message:'Non autorisé: pas de droit'
        })
        throw new Error('Non autorisé: pas de droit')
    }
})
const isEmployee = asyncHandler( async(req,res,next) => { 
    if(req.employee.type === 'Employee'){
        next()
    }else {
        res.status(403).json({
            message:'Non autorisé: pas de droit'
        })
        throw new Error('Non autorisé: pas de droit')
    }
})
export {
    isAuth,
    isAdmin,
    isChefDeDepartement,
    isChefDeProjet,
    isRH
}