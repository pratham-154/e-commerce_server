const faqsModel  =  require("../../models/apis/admin/Faqs");
const { validatorMake } = require('../../helper/General')

const index = async (req, res) => {
    let { search, created_on, status, created_by } = req.query
    let where = {'deleted_at': {$eq: null}};
    
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

    if(created_on && Array.isArray(created_on))
    {
        let dateFilter = {};

        if(created_on[0] && created_on[0] !== '')
        {
            dateFilter.$gte = new Date(created_on[0]);
        }

        if(created_on[1] && created_on[1] !== '')
        {
            dateFilter.$lte = new Date(created_on[1]);
        }

        if(Object.keys(dateFilter).length > 0)
        {
            where.created_at = dateFilter;
        }
    }

    if(created_by && Array.isArray(created_by) && created_by.length > 0)
    {
        where = {
            ...where,
            'created_by': {
                $in: created_by
            }
        };
    }

    if(status)
    {
        where.status = status;
    }

    let select = {
        '_id':1,
        'title':1,
        'description':1
    };

    let data = await faqsModel.getListing(req, select, where);
    //let data = await faqsModel.getAll(where, select);
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
            'message':'No data found',
            'data':[]
        })
    }
};

const add = async (req, res) => {
    let data = req.body;
    let validatorRules = await validatorMake(
        data,
        {
            "title": "required",
            "description":"required"
        }
    );

    if(!validatorRules.fails())
    {
        //data.created_by = await adminModel.getLoginId(req);
        let resp = await faqsModel.create(data);
        if(resp)
        {
            res.send({
                'status':true,
                'message':'Record has been saved successfully.',
                'data':resp
            })
        }
        else
        {
            res.send({
                'status':false,
                'message':'Something went wrong. Please try again later.',
                'data':[]
            })
        }
    }
    else
    {
        res.send({
            'status':false,
            'message':validatorRules.errors
        });
    }
};

const edit = async (req, res) => {
    let {id} = req.params;
    let data = req.body;
    let validatorRules = await validatorMake(
        data,
        {
            "title": "required",
            "description":"required"
        }
    );

    if(!validatorRules.fails())
    {
        let resp = await faqsModel.modify(id, data);
        if(resp)
        {
            res.send({
                'status':true,
                'message':'Record has been saved successfully.',
                'data':resp
            })
        }
        else
        {
            res.send({
                'status':false,
                'message':'Something went wrong. Please try again later.',
                'data':[]
            })
        }
    }
    else
    {
        res.send({
            'status':false,
            'message':validatorRules.errors
        });
    }
};

const remove = async (req, res) => {
    let {id} = req.params;
    
    let resp = await faqsModel.remove(id);
    
    if(resp)
    {
        res.send({
            'status':true,
            'message':'Record has been deleted successfully',
            'data':resp,
        })
    }
    else
    {
        res.send({
            'status':false,
            'message':'Something went wrong. Please try again later.',
            'data':[]
        })
    }
};

const view = async (req, res) => {
    let {id} = req.params;
    
    let resp = await faqsModel.get(id);
    
    if(resp)
    {
        res.send({
            'status':true,
            'message':'Record has been fetched successfully.',
            'data':resp,
        })
    }
    else
    {
        res.send({
            'status':true,
            'message':'Not able to find any record. Please try again later.',
            'data':[]
        })
    }
};

const bulkAction = async (req, res) => {
    let { type } = req.params
    let { ids } = req.body
    if(ids && ids.length > 0 && type)
    {
        switch(type)
        {
            case 'active':
                await faqsModel.modifyAll(ids, {
                    'status': 1
                });
                message = ids.length+' records has been published.';
            break;
            case 'inactive':
                await faqsModel.modifyAll(ids, {
                    'status': 0
                });
                message = ids.length+' records has been unpublished.';
            break;
            case 'delete':
                await faqsModel.removeAll(ids);
                message = ids.length+' records has been deleted.';
            break;
        }

        res.send({
            'status':true,
            'message':message
        });
    }
    else
    {
        res.send({
            'status':false,
            'message':'Please select atleast one record.'
        });
    }
}

module.exports = { 
    index, 
    add,
    edit,
    remove,
    view,
    bulkAction
};
