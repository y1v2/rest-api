var mongoose = require('mongoose')
var url = require('url');
var schema = mongoose.Schema;
var hospitalFields = new schema({
    hospitalName: {
        type: String
    },
    location: {
        type: String
    },
    vaccineAvailable: {
        type: Boolean
    },
    contactNumber: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    bookedSlot: [

    ]

    ,

    // slot1: {
    //     type: String,
    //     enum: ["BOOKED", "AVAILABLE"],
    //     default: "AVAILABLE"
    // },
    // slot2: {
    //     type: String,
    //     enum: ["BOOKED", "AVAILABLE"],
    //     default: "AVAILABLE"
    // },
    // slot3: {
    //     type: String,
    //     enum: ["BOOKED", "AVAILABLE"],
    //     default: "AVAILABLE"
    // },
    // slot4: {
    //     type: String,
    //     enum: ["BOOKED", "AVAILABLE"],
    //     default: "AVAILABLE"
    // },
    // slot5: {
    //     type: String,
    //     enum: ["BOOKED", "AVAILABLE"],
    //     default: "AVAILABLE"
    // },
    // slot6: {
    //     type: String,
    //     enum: ["BOOKED", "AVAILABLE"],
    //     default: "AVAILABLE"
    // },

})
module.exports = mongoose.model("user", hospitalFields)