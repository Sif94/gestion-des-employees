import mongoose from "mongoose";


const heuresSuppSchema = new mongoose.Schema({
    date_h_supp: {
        type: Date,
        required: true,
    },
    duree: {
        type: number,
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

const HeuresSupplementaire = mongoose.model("HeuresSupplementaire", heuresSuppSchema);

export default HeuresSupplementaire;