import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const employeeArchiveSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    date_naiss: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Admin', 'Chef_De8projet','Chef_De_Departement', 'RH', 'Employee']
    },
    telephone: { 
        type: String,
        unique: true
    },
    situation_marital: {
        type: String,
        required: true,
        enum: ['Married', 'Divorced', 'Single', 'Separated', 'Widowed']
    },
    sexe: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    adresse : {
        type: String
    },
    post: {
        type: String,
        required: true,
    },
    departement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departement"
    }
}, {timestamps: true})

const EmployeeArchive = mongoose.model('EmployeeArchive', employeeArchiveSchema);
export default EmployeeArchive