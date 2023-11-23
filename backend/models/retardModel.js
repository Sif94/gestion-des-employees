import mongoose from "mongoose";


const retardSchema = new mongoose.Schema({
    date_retard: {
        type: Date,
        required: true,
    },
    motif: {
        type: String,
        required: true,
    },
    justifiee: {
        type: Boolean
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
    signaleur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }
})

const Retard = mongoose.model("Retard", absenceSchema);

export default Retard;