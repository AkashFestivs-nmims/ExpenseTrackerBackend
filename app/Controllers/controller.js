const queryresult = require('../Queries/queries.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
require('dotenv').config();

module.exports = {

    getUserDetails :async (req,res,next) =>{
        await console.log('Email value from cookie: ',req.body.username);
        Promise.all([queryresult.getUserDetail(req.body.username)]).then(result => {
            let data = result[0].rows;
            res.send(data);
        })  
    },

    verifyUser :async (req,res,next) =>{
        await console.log('Email : ',req.body.username);
            Promise.all([queryresult.verifyLogin(req.body.username)]).then(result => {
                let data = result[0].rows;
                console.log(data);
                res.send(data);
            })  
    },

    getDashboardCompByRole :async (req,res,next) =>{
        await console.log('Role : ',req.body);
            Promise.all([queryresult.getDashboardCompByRole(req.body.role)]).then(result => {
                console.log('result : ',result[0].rows);
                let data = result[0].rows;
                res.send(data);
            })  
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