const {redisDB} = require("../Configs/database.js");

module.exports = {

    verifyRequest : async(req,res,next) =>{

        try{

            let redisJson =await redisDB.get(req.body.key);
            console.log('Inside MiddleWare : ',redisJson);
            if(redisJson){
                next();
            }else{
                res.status(403).json({message: 'Invalid Request'});
            }

        }catch(err){
            res.status(403).json({message: 'Invalid Request'});
        }
        
    }
}