// const { getBearerToken } =  require('../helper/General')
// const {checkToken} = require("../models/apis/admin/Admins")

const Admin = async (req, res, next)=>{
    next();
    // let token = getBearerToken(req);
    // if(token)
    // {
    //     if(await checkToken(token))
    //     {
    //         next();
    //     }
    //     else
    //     {
    //         res.status(401).send({
    //             status:false,
    //             message:'Admin not logged in'
    //         })    
    //     }
    // }
    // else
    // {
    //     res.status(401).send({
    //         status:false,
    //         message:'Admin not logged in'
    //     })
    // }
};

module.exports = Admin;