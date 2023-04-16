const router = require('express').Router();
const controller = require('../Controllers/controller.js');


router.get('/get-users',controller.getUsers);



module.exports = router;