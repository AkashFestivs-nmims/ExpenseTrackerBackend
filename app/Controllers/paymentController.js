const queryresult = require('../Queries/PaymentQueries.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {redisDB} = require("../Configs/database.js");
const {uploadImage} = require('../Configs/imageKit.js')


module.exports = {

    getUserPaymentType :async (req,res,next) =>{
        let redisJson =await redisDB.get(req.body.key);
        let value = await JSON.parse(redisJson);
            Promise.all([queryresult.getUserPaymentType(value[0].user_lid)]).then(result => {
                console.log('result : ',result[0].rows);
                let data = result[0].rows;
                res.send(data);
            })  
    },

    viewAllPaymentType :async (req,res,next) =>{
            Promise.all([queryresult.viewAllPaymentType()]).then(result => {
                console.log('result : ',result[0].rows);
                let data = result[0].rows;
                res.send(data);
            })  
    },

    addPaymnetType : async (req,res,next) =>{
        let redisJson = await redisDB.get(req.body.key);
        let value = JSON.parse(redisJson);

        let imgName = crypto.randomUUID()+req.body.paynmetTypeName;
        let imgData = await uploadImage(imgName,req.body.paymentFile);
        let obj = {"upload" : [{
            "payment_name" : req.body.paynmetTypeName,
            "payment_icon" : imgData.url,
            "imgKit_id" : imgData.fileId,
            "discription" : req.body.paynmetTypeDiscription,
            "created_by" : value[0].user_lid
            }
        ]}

        console.log('UPLOAD : ',obj);
        Promise.all([queryresult.addPaymnetType(obj)]).then(result => {
            console.log('result : ',result[0].rows);
            let data = result[0].rows;
            res.status(200).json(obj);
        })    
    },

    addPaymnetTypeMapping :async (req,res,next) =>{
        let redisJson =await redisDB.get(req.body.key);
        let value = JSON.parse(redisJson);

            // Promise.all([queryresult.addPaymnetTypeMapping(value[0].user_lid,req.body.Paymnet_type_id)]).then(result => {
            //     console.log('result : ',result[0]);
            //     let data = result[0].rows;
            //     res.send(data);
            // })  

            try{
                const respons = await queryresult.addPaymnetTypeMapping(value[0].user_lid,req.body.Paymnet_type_id);
                res.status(200).json({roeCount: respons.rowCount})
            }catch(err){
                if(err.message.includes('uniquepaymenttype')){
                    res.status(409).json({message:"Mapping Exists",code : 409});
                }else{
                    res.status(406).json({message: 'Not Acceptable'});
                }
            }

    },
}