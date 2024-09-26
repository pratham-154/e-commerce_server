const {faqs}   = require('../../index');

const getAll = async (where = {}, select = [], joins = [], orderBy = {'title':1}, limit = 10) => {
    try {
        let listing = await faqs.find(where, select)
                            .populate(joins)
                            .sort(orderBy)
                            .limit(limit);
        
        return listing;
    } catch (error) {
        console.log(error)
        return false
    }
}

const getListing = async (req, select = {}, where = {}, joins = [], orderBy = {'title':1}) => {
    try {
        let {sort, direction, limit, offset, page} = req.query;
        
        direction = direction && direction == 'asc' ? -1 : 1;
        sortField = sort ? sort : 'created_at';
        limit     = limit ? parseInt(limit) : 10;
        offset    = page > 1 ? ((page-1)*limit) : 0;
        orderBy   = { [sortField]:direction }
    
        let listing = faqs.find(where, select, {skip:offset})
                        .populate(joins)
                        .sort(orderBy)
                        .limit(limit)
    
        return listing;
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = { getAll, getListing };