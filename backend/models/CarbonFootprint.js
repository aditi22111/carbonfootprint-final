const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    totalEmission: { type: Number, required: true }, // Added field for total emission
    totalOffset: { type: Number, required: true }, 
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
