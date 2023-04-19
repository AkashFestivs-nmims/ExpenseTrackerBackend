const queryresult = require('../Queries/queries.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
require('dotenv').config();

module.exports = {

    getUsers : (req , res , next ) =>{
        Promise.all([queryresult.getUsers()]).then(result => {
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