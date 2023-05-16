const {postgres} = require("../Configs/database.js");

module.exports = class transactionQuery{

    static initializeTransaction(json) {
        console.log('Transaction Json in query : ',json);
        return postgres.query(`select * from initialize_transaction($1)`,[json]);
    }
}
