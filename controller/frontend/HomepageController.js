const homepageModel = require("../../models/apis/frontend/Homepage");
const bannerModel = require("../../models/apis/frontend/Banner");
const productModel = require("../../models/apis/frontend/Product");
const feedbackModel = require("../../models/apis/frontend/Feedback");

const view = async (req, res) => {
  let { id } = req.params;

  req.query.params = req.query.params || {
    sort: "created_at",
    direction: "desc",
    limit: 5,
    page: 1,
  };

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

module.exports = { view };
