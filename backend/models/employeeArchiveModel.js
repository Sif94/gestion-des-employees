import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const employeeArchiveSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    prenom: {
        type: String,
        required: true,
        min: 3,
        max: 20
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
        unique: true,
        min: 3,
        max: 15
    },
    type: {
        type: String,
        required: true,
        enum: ['Admin', 'Chef_De_Projet', 'Employee', 'RH', 'Chef_De_Departement']
    },
    telephone: {
        type: String,
        unique: true,
        min: 14,
        max: 14
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
        type: String,
        min: 10,
        max: 60
    },
    post: {
        type: String,
        required: true,
        min: 5,
        max: 20
    },
    departement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departement',
        required: true
    }


 
}, {timestamps: true})

const EmployeeArchive = mongoose.model('EmployeeArchive', employeeArchiveSchema);
export default EmployeeArchive