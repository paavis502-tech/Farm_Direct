const mongoose = require('mongoose');

const registration = new mongoose.Schema({
    
    firstName: {type: String, required: true},
    lastName: {type: String},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true },
    role: {type: String, enum: ['farmer', 'consumer'], required: true}
});

const Registrations = mongoose.model("Registrations", registration);

module.exports = Registrations;