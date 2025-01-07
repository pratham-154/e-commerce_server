const { validatorMake, _date } = require("../../helper/General");
const orderModel = require("../../models/apis/frontend/Order");
const productModel = require("../../models/apis/frontend/Product");

const index = async (req, res) => {
  let { search } = req.query.params;
  let { id } = req.userId;
  if (!id) {
    res.send({
      status: false,
      message: "Unauthorized. Please log in.",
    });
  }

  let where = { user_id: id };

  if (search) {
    search = new RegExp(search, "i");
    where = {
      ...where,
      $or: [
        {
          user_id: search,
        },
        {
          product_id: search,
        },
      ],
    };
  }

  let select = {
    // _id: 1,
    // title: 1,
    // description: 1,
  };

  let joins = [
    {
      path: "product_id",
      select: "",
    },
  ];

  let { listing, totalCount, totalPages } = await orderModel.getListing(
    req,
    select,
    where,
    joins
  );

  if (listing && listing.length > 0) {
    res.send({
      status: true,
      message: "Record has been fetched successfully.",
      totalCount: totalCount,
      totalPages: totalPages,
      data: listing,
    });
  } else {
    res.send({
      status: false,
      message: "No orders found for the user.",
      totalCount: 0,
      totalPages: 0,
      data: [],
    });
  }
};

const add = async (req, res) => {
  let { id } = req.userId;
  if (!id) {
    res.send({
      status: false,
      message: "Unauthorized. Please log in.",
    });
  }

  let { slug } = req.params;
  let data = req.body;

  let validatorRules = await validatorMake(data, {});
  if (validatorRules.fails()) {
    res.send({
      status: false,
      message: validatorRules.errors,
    });
  }

  const productData = await productModel.getRow({ slug: slug });
  console.log("product", productData);
  if (!productData) {
    res.send({
      status: false,
      message: "Product not found",
      data: [],
    });
  }

  if (productData.quantity < data.item) {
    return res.send({
      status: false,
      message: "Insufficient stock available.",
    });
  }

  let updateData = {
    quantity: productData.quantity - data.item,
  };

  let updateResp = await productModel.update(productData._id, updateData);
  console.log("updateResp", updateResp);
  if (!updateResp) {
    res.send({
      status: false,
      message: "Failed to update product quantity.",
    });
  }

  let orderData = {
    user_id: id,
    product_id: productData._id,
    item: data.item,
    delivered_at: _date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  console.log("orderData", orderData);

  let orderResp = await orderModel.insert(orderData);
  if (orderResp) {
    res.send({
      status: true,
      message: "Record has been saved Successfully.",
      data: orderResp,
    });
  } else {
    res.send({
      status: false,
      message: "Something went wrong. Please try again later.",
      data: [],
    });
  }
};

const update = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  let validatorRules = await validatorMake(data, {});

  if (!validatorRules.fails()) {
    let resp = await orderModel.update(id, data);
    if (resp) {
      res.send({
        status: true,
        message: "Record has been saved successsfully.",
        data: resp,
      });
    } else {
      res.send({
        status: false,
        message: "Something went wrong. Please try again later.",
        data: [],
      });
    }
  } else {
    res.send({
      status: false,
      message: validatorRules.errors,
    });
  }
};

const remove = async (req, res) => {
  let { id } = req.params;

  let resp = await orderModel.remove(id);

  if (resp) {
    res.send({
      status: true,
      message: "Record has been deleted Successfully.",
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

const view = async (req, res) => {
  let { id } = req.userId;
  if (!id) {
    res.send({
      status: false,
      message: "Unauthorized. Please log in.",
    });
  }
  console.log("id", id);

  let { slug } = req.params;
  console.log("slug", slug);

  const productData = await productModel.getRow({ slug: slug });
  if (!productData) {
    res.send({
      status: false,
      message: "Product not found",
      data: [],
    });
  }

  const resp = await orderModel.getRow({ product_id: productData._id });
  console.log("orderData", resp);

  if (resp) {
    res.send({
      status: true,
      message: "Record has been fetched Successfully.",
      data: resp,
      productData: productData,
    });
  } else {
    res.send({
      status: false,
      message: "Something went wrong. Please try again later.",
      data: [],
      productData: [],
    });
  }
};

const bulkAction = async (req, res) => {
  let { type } = req.params;
  let { ids } = req.body;
  if (ids && ids.length > 0 && type) {
    switch (type) {
      case "active":
        await orderModel.updateAll(ids, {
          status: 1,
        });
        message = ids.length + "records has been published.";
        break;
      case "inactive":
        await orderModel.updateAll(ids, {
          status: 0,
        });
        message = ids.length + "records has been unpublished.";
        break;
      case "delete":
        await orderModel.removeAll(ids);
        message = ids.length + "records has been deleted.";
        break;
    }
    res.send({
      status: true,
      message: message,
    });
  } else {
    res.send({
      status: false,
      message: "Please select atleast one record.",
    });
  }
};

module.exports = {
  index,
  add,
  update,
  remove,
  view,
  bulkAction,
};
