const {postgres} = require("../Configs/database.js");

module.exports = class queries{
    
    static getUserDetail() {
        return  postgres.query(`select * from public.user pu
                                inner join user_info ui on pu.id = ui.user_lid
                                inner join role r on pu. role_lid = r.id where pu.id = 2;`);
    }

    static getDashboardCompByRole(role){
        return postgres.query(`select sbc.menu,sbc.menu_icon,sbc.link from role r
                                inner join role_side_bar_comp_mapping rsbcm on r.id = rsbcm.role_lid
                                inner join side_bar_component sbc on sbc.id = rsbcm.side_bar_component_lid 
                                where r.name = 'ADMIN' and r.active = true and rsbcm.active = true and sbc.active = true;`)
    }

}