import mongoose from "mongoose";




const departemeentSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        min:2,
        max:50
    },
    description: {
        type: String,
        required: true,
        min:10,
        max:100
    },
    emplacement: {
        type: String,
        min: 5,
        max:30
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