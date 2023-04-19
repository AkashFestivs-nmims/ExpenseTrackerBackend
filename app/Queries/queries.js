const {postgres} = require("../Configs/database.js");

module.exports = class queries{

    static getUsers() {
        return  postgres.query('select * from expenseTracker_URL;')
    } 

}