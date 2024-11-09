const aboutUsModel = require("../../models/apis/frontend/AboutUs");
const feedbackModel = require("../../models/apis/frontend/Feedback");
const partnerModel = require("../../models/apis/frontend/Partner");

const view = async (req, res) => {
  let { id } = req.params;

  let resp = await aboutUsModel.get(id);

  if (resp) {
    let where = { status: 1 };

    feedbackData = await feedbackModel.getListing(req, {}, where);
    partnerData = await partnerModel.getListing(req, {}, where);

    res.send({
      status: true,
      message: "Record has been fetched successfully.",
      data: resp,
      feedbackData: feedbackData,
      partnerData: partnerData,
    });
  } else {
    res.send({
      status: false,
      message: "Something went wrong. Please try again later.",
      data: [],
      feedbackData: [],
      partnerData: [],
    });
  }
};

module.exports = { view };
