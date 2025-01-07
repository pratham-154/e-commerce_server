const { cart } = require("../../index");

const getListing = async (req, select = {}, where = {}) => {
  try {
    let { sort, direction, limit, page } = req.query;

    direction = direction && direction == "asc" ? -1 : 1;
    sortField = sort ? sort : "created_at";
    limit = limit ? parseInt(limit) : 10;
    offset = page > 1 ? (page - 1) * limit : 0;
    orderBy = { [sortField]: direction };

    let listing = cart
      .find(where, select, { skip: offset })
      .sort(orderBy)
      .limit(limit)
      .exec();

    return listing;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const get = async (id, select = [], joins = []) => {
  try {
    let record = cart.findById(id, select);

    if (joins) {
      record = record.populate(joins);
    }

    record = await record.exec();

    return record;
  } catch (error) {
    return false;
  }
};

module.exports = { getListing, get };
