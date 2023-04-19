const router = require('express').Router();
const controller = require('../Controllers/controller.js');


router.get('/get-users',controller.getUsers);
router.post('/get-access-token',controller.generateAccessToken)


module.exports = router;