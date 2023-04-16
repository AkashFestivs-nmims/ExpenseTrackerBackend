const queryresult = require('../Queries/queries.js');

module.exports = {

    getUsers : (req , res , next ) =>{
        Promise.all([queryresult.getUsers()]).then(result => {
            console.log('result : ',result[0])
        })
    }

}