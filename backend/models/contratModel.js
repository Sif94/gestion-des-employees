import mongoose from "mongoose";


const contratSchema = new mongoose.Schema({
    type_contrat: {
        type: String,
        required: true,
        enum: ['CDD', 'CDI']
    },
    date_debut: {
        type: Date,
        required: true
    },
    date_fin: {
        type: Date,
        required: true
    },
    salaire_convenu: {
        type: Number,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    redacteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }
})


const Contrat = mongoose.model("Contrat", contratSchema);
export default Contrat;