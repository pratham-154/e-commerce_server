const { product } = require("../../index");

const getListing = async (req, select = {}, where = {}, joins = []) => {
  try {
    let { sort, direction, limit, page } = req.query.params;

    direction = direction && direction == "asc" ? 1 : -1;
    sortField = sort ? sort : "created_at";
    limit = limit ? parseInt(limit) : 5;
    offset = page > 1 ? (page - 1) * limit : 0;
    orderBy = { [sortField]: direction };

    let listing = await product
      .find(where, select, { skip: offset })
      .sort(orderBy)
      .limit(limit)
      .populate(joins)
      .exec();

    // let pipeline = [
    //   { $match: where },
    //   {
    //     $lookup: {
    //       from: "productCategory",
    //       localField: "category_id",
    //       foreignField: "_id",
    //       as: "category_id",
    //     },
    //   },
    //   { $unwind: "$category_id" },
    //   { $sort: { [sortField]: direction } },
    //   { $skip: offset },
    //   { $limit: limit },
    //   { $project: select },
    // ];

    // let listing = await product.aggregate(pipeline).exce();

    let totalCount = await product.countDocuments(where);
    let totalPages = Math.ceil(totalCount / limit);

    return { listing, totalCount, totalPages };
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAll = async (
  where = {},
  select = [],
  joins = [],
  orderBy = { title: 1 },
  limit = 10
) => {
  try {
    let listing = product.find(where, select).sort(orderBy);

    if (joins) {
      listing = listing.populate(joins);
    }

    if (limit) {
      listing = listing.limit(limit);
    }

    listing = await listing.exec();
    return listing;
  } catch (error) {
    return false;
  }
};

const get = async (id, select = [], joins = []) => {
  try {
    let record = product.findById(id, select);

    if (joins) {
      record = record.populate(joins);
    }

    record = await record.exec();

    return record;
  } catch (error) {
    return false;
  }
};

const getRow = async (where, joins = [], select = []) => {
  try {
    let record = await product.findOne(where, select).exec();

    if (joins.length > 0) {
      record = record.populate(joins);
    }
    return record;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const update = async (id, data) => {
  try {
    data.updated_at = new Date();
    let resp = await product
      .updateOne(
        {
          _id: id,
        },
        data
      )
      .exec();

    if (resp) {
      let updated = await get(id);
      return updated;
    } else {
      return null;
    }
  } catch (error) {
    return false;
  }
};

module.exports = { getListing, get, getRow, getAll, update };
