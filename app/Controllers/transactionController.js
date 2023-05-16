const queryresult = require('../Queries/transactionQuery.js');
const jwt = require('jsonwebtoken');
const {redisDB} = require("../Configs/database.js");


module.exports = {

    initializeTransaction :async (req,res,next) =>{
        let redisJson =await redisDB.get(req.body.key);
        let value = await JSON.parse(redisJson);
        const respons = {"status" : 406 , "message" : "Not Acceptable"}
        try{
            req.body.transaction.statement[0].sender_lid = value[0].user_lid;
            req.body.transaction.statement[0].created_by = value[0].user_lid;
            const respons = await queryresult.initializeTransaction(req.body.transaction);
            res.status(200).json(respons.rows[0])
        }catch(err){
            console.log('err : ',err);
            res.status(406).json(respons);
        }
    },
}