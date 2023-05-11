const queryresult = require('../Queries/walletQuery.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {redisDB} = require("../Configs/database.js");
const {uploadImage} = require('../Configs/imageKit.js')

module.exports = {

    getUserWallet :async (req,res,next) =>{
        let redisJson =await redisDB.get(req.body.key);
        let value = await JSON.parse(redisJson);
            Promise.all([queryresult.getUserWallet(value[0].user_lid)]).then(result => {
                console.log('getUserWallet : ',result[0].rows);
                let data = result[0].rows;
                res.send(data);
            })  
    }

}