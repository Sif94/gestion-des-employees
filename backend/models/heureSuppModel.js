import mongoose from "mongoose";


const heureSuppSchema = new mongoose.Schema({
    date_h_supp: {
        type: Date,
        required: true,
    },
    duree: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    supp_perm: {
        type: String,
        enum: ['Heure_Supplimentaire', 'Permanence']
    },
    tarif: {
        type: Number
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
    redacteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }
})

const HeureSupplementaire = mongoose.model("HeureSupplementaire", heureSuppSchema);

export default HeureSupplementaire;