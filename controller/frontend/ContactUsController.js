const { validatorMake } = require("../../helper/General");
const contactUsModel = require("../../models/apis/frontend/ContactUs");

const index = async (req, res) => {
  let { search } = req.query;
  let where = { status: 1 };

  if (search) {
    search = new RegExp(search, "i");
    where = {
      ...where,
      $or: [
        {
          first_name: search,
        },
        {
          last_name: search,
        },
      ],
    };
  }

  let select = {
    // _id: 1,
    // title: 1,
    // description: 1,
  };

  let data = await contactUsModel.getListing(req, select, where);
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

const add = async (req, res) => {
  let data = req.body;
  let validatorRules = await validatorMake(data, {
    first_name: "required",
    last_name: "required",
    email: "required",
    phone_number: "required",
    message: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await contactUsModel.insert(data);
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
    first_name: "required",
    last_name: "required",
    email: "required",
    phone_number: "required",
    message: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await contactUsModel.update(id, data);
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

  let resp = await contactUsModel.remove(id);

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
  let { id } = req.params;

  let resp = await contactUsModel.get(id);

  if (resp) {
    res.send({
      status: true,
      message: "Record has been fetched successfully.",
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

const bulkAction = async (req, res) => {
  let { type } = req.params;
  let { ids } = req.body;
  if (ids && ids.length > 0 && type) {
    switch (type) {
      case "active":
        await contactUsModel.updateAll(ids, {
          status: 1,
        });
        message = ids.length + "records has been published.";
        break;
      case "inactive":
        await contactUsModel.updateAll(ids, {
          status: 0,
        });
        message = ids.length + "records has been unpublished.";
        break;
      case "delete":
        await contactUsModel.removeAll(ids);
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