import jwt from "jsonwebtoken"

const generateToken = (_id) => {
    const token = jwt.sign({_id}, process.env.JWT_SECRET,{expiresIn: '2d'})
    // res.cookie('token', token, {httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV !== 'development', maxAge: 60 * 60 * 1000})
    return token
}


export default generateToken