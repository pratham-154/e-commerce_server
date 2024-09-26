const faqsModel  =  require("../../models/apis/frontend/Faqs")

const index = async (req, res) => {
    let { search }  = req.query
    let where       = {status:1};
    
    if(search)
    {
        search = new RegExp(search,'i')
        where = {
            ...where,
            $or:[
                {
                    "title":search
                },
                {
                    "description":search
                }
            ]
        }
    }

    let select = {
        '_id':0,
        'title':1,
        'description':1
    };

    let data = await faqsModel.getListing(req, select, where);    
    if(data)
    {
        res.send({
            'status':true,
            'message':'Data Fetch Successfully',
            'data':data
        })
    }
    else
    {
        res.send({
            'status':true,
            'message':'Something went wrong',
            'data':[]
        })
    }
};

module.exports = { index };