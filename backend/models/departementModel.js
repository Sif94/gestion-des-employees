import mongoose from "mongoose";




const departemeentSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    emplacement: {
        type: String,
    },
    chef_departement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    employees: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}]
    },
    projets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Projet'}]
}, {timestamps:true})

const Departement = mongoose.model("Departement", departemeentSchema);

export default Departement;