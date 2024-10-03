const productModel = require("../../models/apis/frontend/Product");

const index = async (req, res) => {
  let { search, stock, category_id, sale } = req.query;
  let where = { status: 1 };

  if (search) {
    search = new RegExp(search, "i");
    where = {
      ...where,
      $or: [
        {
          title: search,
        },
        {
          description: search,
        },
      ],
    };
  }

  if (stock) {
    where = {
      ...where,
      stock: stock,
    }
  }

  if (category_id) {
    where = {
      ...where,
      category_id: category_id,
    }
  }

  if (sale) {
    where = {
      ...where,
      sale: sale,
    }
  }

  let select = {
    _id: 1,
    title: 1,
    category_id: 1,
    price: 1,
    discount: 1,
    stock: 1,
    quantity: 1,
    sale: 1,
    // description: 1,
  };

  let joins = [
    {
      path: "category_id",
      select: "_id, title",
    }
  ]

  let data = await productModel.getListing(req, select, where);
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

  let resp = await productModel.get(id);

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
