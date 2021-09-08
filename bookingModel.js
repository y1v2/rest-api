const mongoose = require('mongoose')
const slotBookingSchema = mongoose.Schema

const slotBookingKey = new slotBookingSchema({
    userId: { type: String },
    userName: { type: String },
    centerName: { type: String },
    centerAddress: { type: String },
    slotTime: { type: String },
    slotbooked: { type: Boolean }
}, { timestamps: true })

module.exports = mongoose.model('slotBooking', slotBookingKey)