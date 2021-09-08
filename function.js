const nodemailer = require('nodemailer');
var path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, callback) {
        let ext = path.extname(file.originalname)
        callback(null, Date.now() + ext)
    }
})

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})
module.exports = {
    upload,
    otp: () => {
        const otp = Math.floor(Math.random() * 900000 + 100000);
        return otp;
    },

    sendemail: (FirstName, otp, _id, callback) => {
        var url = `http://localhost:5000/user/emailVerify/${_id}`
        var text = `Dear ${FirstName} , your otp : ${otp} and link ${url} `;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'yvishwakarma315@gmail.com',
                pass: '8423794626'
            }
        });

        var mailOptions = {
            from: 'yvishwakarma315@gmail.com',
            to: 'yash1750531029@gmail.com',
            subect: 'verify email and otp',
            text: text

        };

        transporter.sendMail(mailOptions, (err, res) => {
            if (err) {
                callback(err, null)
            } else { callback(null, res) }
        });



    }
}