import mongoose from "mongoose";

const projetSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date_debut: {
        type: Date,
        required: true,
    },
    date_fin: {
        type: Date,
        required: true,
    },
    duree: {
        type: Number,
    },
    employees: [{type: mongoose.Schema.Types.ObjectId, ref: "Employee"}],
    chef_projet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
    departements: [{type: mongoose.Schema.Types.ObjectId, ref: "Departement"}],

},{timestamps: true})

const Projet = mongoose.model("Projet", projetSchema);
export default Projet;