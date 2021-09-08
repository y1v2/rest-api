const bcrypt = require('bcryptjs')
var mongoose = require('mongoose')
var schema = mongoose.Schema;

var userFields = new schema({
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    },
    MobileNumber: {
        type: String
    },
    otp: {
        type: Number
    },
    otpTime: {
        type: Number
    },
    otpVerification: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    },
    booked: {
        type: Boolean,
        default: false
    },
    slotTime: {
        type: String
    },
    bookedhospital: {
        type: String
    },
    userType: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    CountryCode: {
        type: String
    }
})

module.exports = mongoose.model("admin", userFields)
var userModel = mongoose.model("admin", userModel)
userModel.findOne({ userType: "ADMIN" }, (error, result) => {
    if (error) {
        console.log("Internal server error.")
    } else if (result) {
        console.log("Admin already created.")
    } else {
        var obj = {
            FirstName: "Yash",
            LastName: "Vishwakarma",
            Email: "yash@gmail.com",
            MobileNumber: "98789878950",
            CountryCode: "+91",
            Password: bcrypt.hashSync("mypassword"),
            userType: "ADMIN"
        }
        userModel.create(obj, (createErr, createRes) => {
            if (createErr) {
                console.log("Internal server error.", createErr)
            } else {
                console.log("Default admin created successfully.", createRes)
            }
        })
    }
})