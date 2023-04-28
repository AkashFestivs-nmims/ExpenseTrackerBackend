const router = require('express').Router();
const controller = require('../Controllers/controller.js');


router.post('/get-access-token',controller.generateAccessToken);
router.post('/get-user-detail',controller.getUserDetails);
router.post('/get-dashboard-comp',controller.getDashboardCompByRole)


module.exports = router;