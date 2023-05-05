const queryresult = require('../Queries/queries.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {redisDB} = require("../Configs/database.js");
require('dotenv').config();

module.exports = {

    registerUser :async (req,res,next) =>{
        console.log("reg OBJ : ",req.body);
        Promise.all([queryresult.registerUser(req.body)]).then(result => {
            let data = result[0].rows;
            res.send(data);
        }).catch(err =>{
            console.log(err.message);
            if(err.message.includes('unique')){

                res.status(500).json({'message':'Email already Exists','word' : 'already'})
            }else{
                res.status(500).json({'message':'Internal Server Error','word' : 'error'})
            }
        })  
    },

    getUserDetails :async (req,res,next) =>{

        let redisJson =await redisDB.get(req.body.key);
        let value = await JSON.parse(redisJson);
        Promise.all([queryresult.getUserDetail(value[0].email)]).then(result => {
            let data = result[0].rows;
            res.send(data);
        })  
    },

    getProfilDropDownList :async(req,res,next) =>{
        let redisJson =await redisDB.get(req.body.key);
        let value = await JSON.parse(redisJson);
        Promise.all([queryresult.getProfilDropDownList(value[0].id)]).then(result => {
            let data = result[0].rows[0].get_profil_drop_down_list;
            console.log('getProfilDropDownList : ',data[0]);
            res.send(data);
        })

    },

    verifyUser :async (req,res,next) =>{
        console.log("Verify Requesty");
        let username = req.body.username;
        let password = req.body.password;
        if(username !=null && password !=null){
            let key = await crypto.randomUUID();

                Promise.all([queryresult.verifyLogin(username,password)]).then(result => {
                    let data = result[0].rows;
                    console.log('User Data :',JSON.stringify(data).length);
                    if(JSON.stringify(data).length > 2){
                        redisDB.set(key,JSON.stringify(data), { expiresIn: '1d'});
                        data[0].key = key;
                        res.status(200).json(data);
                    }else{
                        res.status(404).json({message: 'No User Found !'});
                    }
                })
        }else{
            res.status(406).json({message: 'Not Acceptable'});
        }  
    },

    getDashboardCompByRole :async (req,res,next) =>{
        let redisJson =await redisDB.get(req.body.key);
        let value = await JSON.parse(redisJson);
            Promise.all([queryresult.getDashboardCompByRole(value[0].role_name)]).then(result => {
                console.log('result : ',result[0].rows);
                let data = result[0].rows;
                res.send(data);
            })  
    },

    logOut : (req , res , next ) =>{
        let key = req.body.key;
        console.log('Logout Hit : ',key);
        redisDB.del(key);
        res.status(200).json({message : 'loggedOut'});

    },

    generateAccessToken : (req , res , next ) =>{
        let obj = {'username':'123'}
        let token  = jwt.sign(obj,process.env.JWT_SECRET,{
            expiresIn: '5m'
        })

        console.log(token);
        res.cookie(crypto.randomUUID(),token, { maxAge: 900000, httpOnly: true, path: '/' });
        return res.status(200).json({token})
    }

}