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
                next()
            } catch (error) {
                res.status(401).json({ message: `Token Invalide: ${error.message}` });
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