const { validatorMake } = require("../../helper/General");
const homepageModel = require("../../models/apis/admin/Homepage");
const bannerModel = require("../../models/apis/admin/Banner");
const productModel = require("../../models/apis/admin/Product");
const feedbackModel = require("../../models/apis/admin/Feedback");

const add = async (req, res) => {
  let data = req.body;
  let validatorRules = await validatorMake(data, {
    text_image_1: "required",
    text_1: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await homepageModel.insert(data);
    if (resp) {
      res.send({
        status: true,
        message: "Record has been saved Successfully.",
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

const update = async (req, res) => {
  let { id } = req.params;
  let data = req.body;
  let validatorRules = await validatorMake(data, {
    text_image_1: "required",
    text_1: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await homepageModel.update(id, data);
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

const view = async (req, res) => {
  let { id } = req.params;

  let resp = await homepageModel.get(id);

  if (resp) {
    let where = { status: 1 };

    let joins = [
      {
        path: "category_id",
        select: "_id title",
      },
    ];

    let bannerData = await bannerModel.getListing(req, {}, where, {});
    let productData = await productModel.getListing(req, {}, where, joins);
    let feedbackData = await feedbackModel.getListing(req, {}, where, {});

    res.send({
      status: true,
      message: "Record has been fetched successfully.",
      data: resp,
      bannerData: bannerData,
      productData: productData.listing,
      feedbackData: feedbackData,
    });
  } else {
    res.send({
      status: false,
      message: "Something went wrong. Please try again later.",
      data: [],
      bannerData: [],
      productData: [],
      feedbackData: [],
    });
  }
};

const bulkAction = async (req, res) => {
  let { type } = req.params;
  let { ids } = req.body;
  if (ids && ids.length > 0 && type) {
    switch (type) {
      case "active":
        await homepageModel.updateAll(ids, {
          status: 1,
        });
        message = ids.length + "records has been published.";
        break;
      case "inactive":
        await homepageModel.updateAll(ids, {
          status: 0,
        });
        message = ids.length + "records has been unpublished.";
        break;
      case "delete":
        await homepageModel.removeAll(ids);
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
  add,
  update,
  view,
  bulkAction,
};
