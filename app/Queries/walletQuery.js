const {postgres} = require("../Configs/database.js");

module.exports = class walletQuery{

    static getUserWallet(user_lid) {
        return postgres.query(`select * from get_user_wallet($1);`,[user_lid]);
    }

    static updateWalletMoney(user_lid,wallet_id,ammount) {
        return postgres.query(`UPDATE user_wallet SET ammount = $1 where id = $2 and user_lid = $3;`,[ammount,wallet_id,user_lid]);
    }

    static updateWalletcolour(user_lid,wallet_id,wallet_colour) {
        return postgres.query(`UPDATE user_wallet SET wallet_colour = $1 where id = $2 and user_lid = $3;`,[wallet_colour,wallet_id,user_lid]);
    }

    static currencyList() {
        return postgres.query(`select id,currency_name from currency_type where active=true;`,);
    }

    static addWallet(json) {
        return postgres.query(`select * from add_wallet($1)`,[json]);
    }
}