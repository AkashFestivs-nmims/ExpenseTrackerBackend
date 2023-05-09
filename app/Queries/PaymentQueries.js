const {postgres} = require("../Configs/database.js");

module.exports = class paymemtQueries{

    static addPaymnetType(json) {
        return postgres.query(`SELECT * FROM insert_payment_type($1)`,[json]);
    }

    static viewAllPaymentType() {
        return postgres.query(`select payment_name,payment_icon,id from payment_type_master where active = true;`);
    }

    static getUserPaymentType(user_lid) {
        return postgres.query(`select ptm.payment_name,ptm.payment_icon,ptm.id as paymnet_type_id,upm.id as user_payment_id from user_paymentType_mapping upm
                                inner join payment_type_master ptm on upm.payment_type_lid = ptm.id 
                                where upm.user_lid = $1 and ptm.active = true and upm.active = true;`,[user_lid]);
    }

    static addPaymnetTypeMapping(user_lid,paymnet_type_lid) {
        return postgres.query(`insert into user_paymentType_mapping(user_lid,payment_type_lid) values($1,$2);`,[user_lid,paymnet_type_lid]);
    }
}