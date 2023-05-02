const {postgres} = require("../Configs/database.js");

module.exports = class queries{
    
    static getUserDetail(username) {
        return  postgres.query(`select * from public.user pu
                                inner join user_info ui on pu.id = ui.user_lid
                                inner join role r on pu. role_lid = r.id where pu.email = $1;`,[username]);
    }

    static getDashboardCompByRole(role){
        console.log('Role in query : '+role);
        return postgres.query(`select sbc.menu,sbc.menu_icon,sbc.link from role r
                                inner join role_side_bar_comp_mapping rsbcm on r.id = rsbcm.role_lid
                                inner join side_bar_component sbc on sbc.id = rsbcm.side_bar_component_lid 
                                where r.role_name = $1 and r.active = true and rsbcm.active = true and sbc.active = true;`,[role]);
    }

    static verifyLogin(email,password) {
        return  postgres.query(`select * from public.user pu
                                inner join user_info ui on pu.id = ui.user_lid
                                inner join role r on pu. role_lid = r.id where pu.email = $1 and password = $2`,[email,password]);
    }

}