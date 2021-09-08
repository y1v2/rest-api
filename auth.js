const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')

module.exports = {
    verifyToken: (req, res, next) => {
        jwt.verify(req.headers.token, 'vaccination', (error, decoded) => {
            if (error) {
                return res.send({ responseCode: 500, responseMessage: "Internal server error", responseResult: error })
            } else {
                userModel.findOne({ _id: decoded._id }, (error, result) => {
                    if (error) {
                        return res.send({ responseCode: 500, responseMessage: "Internal server error", responseResult: error })
                    } else if (!result) {
                        return res.send({ responseCode: 404, responseMessage: "Data not found", responseResult: result })
                    } else {
                        if (result.status == "DELETE") {
                            return res.send({ responseCode: 200, responseMessage: "Your account has been deleted." })
                        } else if (result.status == "BLOCK") {
                            return res.send({ responseCode: 200, responseMessage: "Your account has been blocked by Admin. Please contact to Admin." })
                        } else {
                            req.userId = result._id;
                            next();
                        }
                    }
                })
            }
        })
    }
}