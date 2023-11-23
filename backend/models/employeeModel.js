import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Admin', 'Manager', 'Employee']
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
    
    post: {
        type: String,
        required: true,
    },
    contrats: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contrat'}],

    contrats_redige: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contrat'}],

    conges: [{type: mongoose.Schema.Types.ObjectId, ref: 'Conge'}],

    conges_redige: [{type: mongoose.Schema.Types.ObjectId, ref: 'Conge'}],

    departement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departement"
    },

    absences: [{type: mongoose.Schema.Types.ObjectId, ref: 'Absence'}],

    absences_redige: [{type: mongoose.Schema.Types.ObjectId, ref: 'Absence'}],

    retards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Retard'}],

    retards_redige: [{type: mongoose.Schema.Types.ObjectId, ref: 'Retard'}],

    heures_supplementaires: [{type: mongoose.Schema.Types.ObjectId, ref: 'HeuresSupplementaire'}],

    heures_supplementaires_redige: [{type: mongoose.Schema.Types.ObjectId, ref: 'HeuresSupplementaire'}],

    taches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tache'}],

    taches_redige: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tache'}],

    projets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Projet'}],
    
}, {timestamps: true})


const Employee = mongoose.model('Employee', employeeSchema);
export default Employee