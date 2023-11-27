import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Employee from "../models/employeeModel.js";


const isAuth = asyncHandler( async (req, res, next) => {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.employee = await Employee.findById(decoded._id);
                next()
            } catch (error) {
                res.status(401).json({ message: `Token Invalide: ${error.message}` });
                throw Error('Token Invalide')
            }
        } else {
            res.status(401).json({ message: 'Token manquant' });
            throw Error('Pas de token')
            
        }
})
const isAdmin = asyncHandler( async(req,res,next) => {
    if(req.employee.type === 'Admin' || req.employee.type === 'Manager'){
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
    isAdmin
}