const productCategoryModel = require("../../models/apis/frontend/ProductCategory");

const index = async (req, res) => {
  let { search } = req.query;
  let where = { status: 1 };

  if (search) {
    search = new RegExp(search, "i");
    where = {
      ...where,
      $or: [
        {
          title: search,
        },
      ],
    };
  }

  let select = {
    _id: 1,
    title: 1,
  };

  let data = await productCategoryModel.getListing(req, select, where);
  if (data) {
    res.send({
      status: true,
      message: "Data Fetch Successfully",
      data: data,
    });
  } else {
    res.send({
      status: true,
      message: "No data found",
      data: [],
    });
  }
};

const view = async (req, res) => {
  let { id } = req.params;

  let resp = await productCategoryModel.get(id);

  if (resp) {
    res.send({
      status: true,
      message: "Record has been fetched Successfully.",
      data: resp,
    });
  } else {
    res.send({
      status: false,
      message: "Something went wrong. Please try again later.",
      data: [],
    });
  }
};

module.exports = { index, view };