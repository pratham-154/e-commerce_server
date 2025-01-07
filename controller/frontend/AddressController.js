const { validatorMake } = require("../../helper/General");
const addressModel = require("../../models/apis/frontend/Address");

const index = async (req, res) => {
  let { search } = req.query;
  let where = { status: 1 };

  if (search) {
    search = new RegExp(search, "i");
    where = {
      ...where,
      $or: [
        {
          house: search,
        },
        {
          street: search,
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
      path: "user_id",
      select: "_id first_name last_name",
    },
  ];

  let data = await addressModel.getListing(req, select, where, joins);
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
  let { id } = req.userId;
  let data = req.body;
  let validatorRules = await validatorMake(data, {
    house: "required",
    street: "required",
    state: "required",
    city: "required",
    pincode: "required",
    phone_number: "required",
  });

  if (!validatorRules.fails()) {
    data.user_id = id;
    let resp = await addressModel.insert(data);
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
  let _id = req.params.id;

  let data = req.body;
  let validatorRules = await validatorMake(data, {
    house: "required",
    street: "required",
    state: "required",
    city: "required",
    pincode: "required",
    phone_number: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await addressModel.update(_id, data);
    if (resp) {
      res.send({
        status: true,
        message: "Record updated successsfully.",
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
  let _id = req.params.id;

  let resp = await addressModel.remove(_id);

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

  let where = { user_id: id };

  let joins = [
    {
      path: "user_id",
      select: "_id first_name last_name",
    },
  ];

  let resp = await addressModel.getListing(req, {}, where, joins);

  if (resp && resp.length > 0) {
    res.send({
      status: true,
      message: "Record has been fetched successfully.",
      data: resp,
    });
  } else {
    res.send({
      status: false,
      message: "No addresses found for the user.",
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
        await addressModel.updateAll(ids, {
          status: 1,
        });
        message = ids.length + "records has been published.";
        break;
      case "inactive":
        await addressModel.updateAll(ids, {
          status: 0,
        });
        message = ids.length + "records has been unpublished.";
        break;
      case "delete":
        await addressModel.removeAll(ids);
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
