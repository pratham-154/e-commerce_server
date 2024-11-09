const {
  foreach,
  makeSlug,
  getBearerToken,
} = require("../../../helper/General");
const { user } = require("../../index");

const getListing = async (req, select = {}, where = {}) => {
  try {
    let { sort, direction, limit, page } = req.query;

    direction = direction && direction == "asc" ? -1 : 1;
    sortField = sort ? sort : "created_at";
    limit = limit ? parseInt(limit) : 10;
    offset = page > 1 ? (page - 1) * limit : 0;
    orderBy = { [sortField]: direction };

    let listing = user
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

const getAll = async (
  where = {},
  select = [],
  joins = [],
  orderBy = { title: 1 },
  limit = 10
) => {
  try {
    let listing = user.find(where, select).sort(orderBy);

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
    let record = user.findById(id, select);

    if (joins) {
      record = record.populate(joins);
    }

    record = await record.exec();

    return record;
  } catch (error) {
    return false;
  }
};

const getRow = async (where, select = []) => {
  try {
    let record = await user.findOne(where, select).exec();
    return record;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const insert = async (data) => {
  try {
    let row = new user();
    row.created_at = new Date();

    foreach(data, (key, value) => {
      row[key] = value;
    });

    row.created_by = null;

    let resp = await row.save();

    if (resp) {
      if (resp.first_name) {
        let slug = makeSlug(resp.first_name);
        const count = await getCounts({ name: resp.first_name });
        if (count > 1) {
          slug = slug + "-" + count;
        }
        resp.slug = slug;
        resp.save();
      }
      return resp;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const update = async (id, data) => {
  try {
    data.updated_at = new Date();
    let resp = await user
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

const updateAll = async (ids, data) => {
  try {
    let resp = await user.updateMany(
      {
        _id: { $in: ids },
      },
      data
    );

    if (resp) {
      return resp;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const remove = async (id) => {
  try {
    let getRecord = await get(id);
    if (getRecord) {
      let record = await user
        .deleteOne({
          _id: id,
        })
        .exec();
      return record;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const removeAll = async (ids) => {
  try {
    let record = await user.deleteMany({
      _id: { $in: ids },
    });
    return record;
  } catch (error) {
    return false;
  }
};

const getCounts = async (where = {}) => {
  try {
    let record = await user.countDocuments(where).exec();
    return record;
  } catch (error) {
    return false;
  }
};

const getLoginUser = async (req) => {
  try {
    let token = await getBearerToken(req);
    if (token) {
      let record = await getRow({ login_token: token });

      return record;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getLoginUserId = async (req) => {
  try {
    let token = await getBearerToken(req);
    if (token) {
      let record = await getRow({ login_token: token }, ["_id"]);

      return record;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  getListing,
  getAll,
  get,
  getRow,
  insert,
  update,
  updateAll,
  remove,
  removeAll,
  getCounts,
  getLoginUser,
  getLoginUserId,
};
