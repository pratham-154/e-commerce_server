const { status } = require("express/lib/response");
const productModel = require("../../models/apis/frontend/Product");

const index = async (req, res) => {
  let { search, stock, category_id, sale } = req.query.params;
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
    };
  }

  if (category_id) {
    where = {
      ...where,
      category_id: {
        $in: category_id,
      },
    };
  }

  if (sale === "1") {
    where = {
      ...where,
      sale: { $ne: "" },
    };
  }

  let select = {
    // _id: 1,
    // title: 1,
    // description: 1,
  };

  let joins = [
    {
      path: "category_id",
      select: "_id title",
    },
  ];
  
  let { listing, totalCount, totalPages } = await productModel.getListing( req, select, where, joins );

  if (listing) {
    res.send({
      status: true,
      message: "Data Fetch Successfully",
      totalCount: totalCount,
      totalPages: totalPages,
      data: listing,
    });
  } else {
    res.send({
      status: true,
      message: "No data found",
      totalCount: 0,
      totalPages: 0,
      data: [],
    });
  }
};

const view = async (req, res) => {
  let { slug } = req.params;
  let where = { slug: slug };

  let joins = [
    {
      path: "category_id",
      select: "_id title",
    },
  ];

  let resp = await productModel.getRow(where, joins);

  if (resp) {
    let category_id = resp.category_id._id;

    let whereProduct = { status: 1, category_id: category_id };
    let similarProducts = await productModel.getAll( whereProduct, {}, joins, {}, 3 );
    res.send({
      status: true,
      message: "Record has been fetched Successfully.",
      data: resp,
      similarProduct: similarProducts,
    });
  } else {
    res.send({
      status: false,
      message: "Something went wrong. Please try again later.",
      data: [],
      similarProduct: [],
    });
  }
};

module.exports = { index, view };
