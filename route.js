const router = require('express').Router();
const controller = require('../controller/controller');
const upload = require('../helper/function');

router.post('/newHospital', upload.single('image'), controller.newHospital);
router.get('/hospitalList', controller.hospitalList);
router.put('/updateData', controller.updateData);
router.delete('/deleteData', controller.deleteData);
router.put('/slotBooking', controller.slotBooking);

router.post('/signUp', controller.signUp);
router.put('/otpVerify', controller.otpVerify);

module.exports = router