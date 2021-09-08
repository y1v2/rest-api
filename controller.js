const adminModel = require('../model/userModel')
const hosModel = require('../model/hosModel')
    //const bookingModel = require('../model/bookingModel')
const moment = require('moment');
const bcrypt = require('bcryptjs');
const commonFunc = require('../helper/function');
const userModel = require('../model/userModel');
var i = 0;


module.exports = {

    newHospital: async(req, res) => {
        try {
            var adminresult = await adminModel.find({ Email: req.body.Email, userType: "ADMIN" })
            console.log("line-9")
            if (adminresult.length !== 0) {
                if (req.file) {
                    hosModel.image = req.file.path
                    console.log("image uploaded successfully")
                }
                new hosModel(req.body).save()
                    .then((data, err) => {
                        if (err) {
                            res.status(400).json({ message: "saving err" })
                        } else {
                            res.status(400).json({ message: "data saved successfully...", result: data })
                        }
                    })

            } else {
                res.send({ message: "Enter a valid admin email" })
            }
        } catch {
            res.status(404).json({ message: "internal err1" })
        }



    },
    hospitalList: async(req, res) => {
        try {
            var hoslist = await hosModel.find({ location: req.body.location, vaccineAvailable: true })
            if (hoslist.length !== 0) {
                res.status(200).json({ message: "these hospitals are available", result: hoslist })
            }
        } catch {
            res.send({ message: "internal err2" })
        }
    },
    updateData: async(req, res) => {
        try {
            var adminresult = await adminModel.find({ Email: req.body.Email, userType: "ADMIN" })
            if (adminresult.length !== 0) {
                hosModel.findByIdAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true })
                    .then((upresult, uperr) => {
                        if (uperr) {
                            res.status(404).json({ message: "server errr" })
                        } else {
                            res.status(500).json({ message: "data updated successfully", result: upresult })
                        }
                    })

            } else {
                res.send({ message: "Enter a valid admin email" })
            }
        } catch {
            res.send({ message: "internal err3" })
        }
    },
    deleteData: async(req, res) => {

        try {
            var adminresult = await adminModel.find({ Email: req.body.Email, userType: "ADMIN" })
            if (adminresult.length !== 0) {
                var data = await hosModel.findByIdAndDelete({ _id: req.body._id })
                    .then(res.send({ message: "data deleted...!", result: data }))
            } else {
                res.send({ message: "Enter a valid admin email" })
            }

        } catch {
            res.status(400).json({ message: "internal err" })
        }
    },

    signUp: (req, res) => {
        try {

            userModel.findOne({ Email: req.body.Email, userType: "USER" }, (err, result) => {
                if (err) {

                    return res.send({ resposeCode: 500, responseMessage: "Server Not Found", resposeCode: err })
                } else if (result) {
                    res.send({ responseCode: 500, responseMessage: "email already exits" });
                } else {
                    console.log("aa gya");
                    req.body.otp = commonFunc.otp();
                    req.body.otpTime = new Date().getTime();
                    req.body.Password = bcrypt.hashSync(req.body.Password);
                    // req.body.UserName = req.body.FirstName.concat(req.body.MobileNumber.substr(-4));
                    console.log("yha tk nhi aya h");
                    new adminModel(req.body).save((saveerr, saveres) => {
                        if (saveerr) {
                            return res.send({ responseCode: 500, responseMessage: "internal server error", responseResult: saveerr })
                        } else {

                            console.log("yha bhi");
                            commonFunc.sendemail(saveres.FirstName, saveres.otp, saveres._id, (mailerr, mailres) => {
                                if (mailerr) {
                                    return res.send({ resposeCode: 501, responseMessage: "internal server error" })
                                } else {
                                    console.log("yha nhi aya")
                                    return res.send({ resposeCode: 200, responseMessage: "signup succefully done", responseResult: saveres })
                                }
                            })
                        }
                    })

                }
            })
        } catch (error) {
            return res.send({ responseCode: 501, responseMessage: "Something went wrong.." })
        }
    },
    otpVerify: (req, res) => {
        try {
            userModel.findOne({ Email: req.body.Email, userType: "USER" }, (emailErr, emailRes) => {
                if (emailErr) {
                    return res.send({ responseCode: 500, responseMessage: "Internal server error3" })
                } else if (!emailRes) {
                    return res.send({ responseCode: 404, responseMessage: "Data Not Found.." })


                } else {
                    var currentTime = new Date().getTime();
                    var dbTime = emailRes.otpTime;
                    var diff = currentTime - dbTime
                    if (diff <= 180000) {
                        if (emailRes.otp == req.body.otp) {
                            userModel.findByIdAndUpdate({ _id: emailRes._id }, { $set: { otpVerification: true } }, { new: true }, (updateErr, updateRes) => {

                                if (updateErr) {
                                    return res.send({ responseCode: 500, responseMessage: "Internal server error4", responseResult: error })
                                } else {
                                    return res.send({ responseCode: 200, responseMessage: "Otp verified successfully!", responseResult: updateRes })
                                }

                            })

                        } else {
                            return res.send({ responseCode: 402, responseMessage: "Incorrect otp.", responseResult: [] });
                        }

                    } else {
                        return res.send({ responseCode: 402, responseMessage: "Otp Expired.", responseResult: [] });
                    }
                }

            })


        } catch (error) {
            return res.send({ responseMessage: "Something Went Wrong" })
        }

    },
    slotBooking: async(req, res) => {
        try {
            var userData = await adminModel.findOne({ Email: req.body.Email, userType: "USER", booked: false });
            var centerData = await hosModel.findOne({ hspitalName: req.body.hospitalName });

            if (userData !== 0) {
                if (centerData !== 0) {

                    var startTime = moment().utc().set({ hour: 9, minute: 00 });
                    var endTime = moment().utc().set({ hour: 17, minute: 59 });


                    if (startTime <= endTime) {
                        centerData.bookedSlot.push(new moment(startTime).format('HH:mm'));
                        startTime.add(30, 'minutes');
                    }

                    console.log('booked Slots ', centerData.bookedSlot)
                    adminModel.findByIdAndUpdate({ Email: req.body.Email }, { $set: [{ booked: true, bookedHospital: req.body.hospitalName, slotTime: centerData.bookedSlot[i] }] }, { new: true })
                        .then((upres, uperr) => {
                            if (uperr) {
                                console.log("not update");
                            } else {
                                console.log("slot booked succesfully", upres)
                                i = i + 1;
                            }


                        })
                } else {
                    res.send({ message: "hospital not found" })
                }


            } else {
                res.send({ message: "email not registered" });
            }
        } catch {
            res.send({ message: "internal err" })
        }

    }
}