const router = require('express').Router();
const middleWare = require('../middleWare/middleWare.js')
const controller = require('../Controllers/controller.js');


router.post('/get-access-token',controller.generateAccessToken);
router.post('/get-user-detail',middleWare.verifyRequest,controller.getUserDetails);
router.post('/get-dashboard-comp',middleWare.verifyRequest,controller.getDashboardCompByRole);
router.post('/verify-user',controller.verifyUser);
router.post('/logout',middleWare.verifyRequest,controller.logOut);


module.exports = router;