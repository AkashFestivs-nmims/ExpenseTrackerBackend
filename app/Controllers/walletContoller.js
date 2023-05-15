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
    },

    updateWalletMoney :async (req,res,next) =>{
        let redisJson =await redisDB.get(req.body.key);
        let value = await JSON.parse(redisJson);
        try{
            const respons = await queryresult.updateWalletMoney(value[0].user_lid, req.body.wallet_id, req.body.ammount);
            res.status(200).json({roeCount: respons.rowCount})
        }catch(err){
            res.status(406).json({message: 'Not Acceptable'});
        }
    },

    updateWalletColour :async (req,res,next) =>{
        let redisJson =await redisDB.get(req.body.key);
        let value = await JSON.parse(redisJson);
        try{
            const respons = await queryresult.updateWalletcolour(value[0].user_lid, req.body.wallet_id, req.body.wallet_colour);
            res.status(200).json({roeCount: respons.rowCount})
        }catch(err){
            res.status(406).json({message: 'Not Acceptable'});
        }
    },

    currencyList :async (req,res,next) =>{
        let redisJson =await redisDB.get(req.body.key);
            Promise.all([queryresult.currencyList()]).then(result => {
                let data = result[0].rows;
                res.send(data);
            })  
    },

    addWallet :async (req,res,next) =>{
        let redisJson = await redisDB.get(req.body.key);
        let value = JSON.parse(redisJson);

        let imgName = crypto.randomUUID()+req.body.WalletName;
        let imgData = await uploadImage(imgName,req.body.walletIcon);
        let obj = {"wallet" : [{
            "user_lid" : value[0].user_lid,
            "walletIcon" : imgData.url,
            "WalletName" : req.body.WalletName,
            "ammount" : req.body.ammount,
            "currencyTypeId" : req.body.currencyTypeId,
            "walletColour" : req.body.walletColour,
            }
        ]}

        Promise.all([queryresult.addWallet(obj)]).then(result => {
            console.log('result : ',result[0].rows);
            let data = result[0].rows;
            res.status(200).json(data);
        })  
    }

    

}