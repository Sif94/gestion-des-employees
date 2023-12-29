import mongoose from "mongoose";


const absenceSchema = new mongoose.Schema({
    date_absence: {
        type: Date,
        required: true,
    },
    motif: {
        type: String,
        required: true,
    },
    justifiee: {
        type: Boolean,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
    signaleur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    }
}, {timestamps: true})

const Absence = mongoose.model("Absence", absenceSchema);

export default Absence;