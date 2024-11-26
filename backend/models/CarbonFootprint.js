const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarbonFootprintSchema = new Schema({
    totalEmission: { type: Number, required: true },
    totalOffset: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },  // Make sure this is correctly set
});

const CarbonFootprint = mongoose.model('CarbonFootprint', CarbonFootprintSchema);

module.exports = CarbonFootprint;
