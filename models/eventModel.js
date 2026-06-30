const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String },
    location: { type: String, required: true },
    host: { type: String },
    phoneNumber: { type: String, required: true },
    guests: { type: Array },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    registrationLink: { type: String }
})

const event = mongoose.model('event', eventSchema);

module.exports = event