import mongoose from "mongoose";



const congeSchema = new mongoose.Schema({
    date_debut : {
        type: Date,
        required: true
    },
    date_fin : {
        type: Date,
        required: true
    },
    type_conge: {
        type: String,
        enum: ['Congé payé', 'Congé non payé'],
        required: true
    },
    motif: {
        type: String,
        required: true
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
},{timestamps: true})

const Conge = mongoose.model("Conge", congeSchema);
export default Conge;