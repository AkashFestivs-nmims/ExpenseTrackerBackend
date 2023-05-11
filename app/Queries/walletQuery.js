const {postgres} = require("../Configs/database.js");

module.exports = class walletQuery{

    static getUserWallet(user_lid) {
        return postgres.query(`select id as wallet_id,wallet_name,wallet_icon,wallet_colour,ammount,currency_type_lid,preferences 
                            from user_wallet where user_lid = $1;`,[user_lid]);
    }
}