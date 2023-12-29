import mongoose from "mongoose";




const tacheSchema = new mongoose.Schema({
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
    employees: [{type: mongoose.Schema.Types.ObjectId, ref: "Employee"}],
    redacteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }
}, {timestamps: true})

const Tache = mongoose.model("Tache", tacheSchema);
export default Tache;