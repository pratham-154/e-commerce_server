const { validatorMake } = require("../../helper/General");
const productModel = require("../../models/apis/admin/Product");

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

const add = async (req, res) => {
  let data = req.body;
  console.log(data);
  let validatorRules = await validatorMake(data, {
    title: "required",
    description: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await productModel.insert(data);
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
    title: "required",
    description: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await productModel.update(id, data);
    if (resp) {
      res.send({
        status: true,
        message: "Record has been saved successfully.",
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

  let resp = await productModel.remove(id);

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

const bulkAction = async (req, res) => {
  let { type } = req.params;
  let { ids } = req.body;
  if (ids && ids.length > 0 && type) {
    switch (type) {
      case "active":
        await productModel.modifyAll(ids, {
          status: 1,
        });
        message = ids.length + " records has been published.";
        break;
      case "inactive":
        await productModel.modifyAll(ids, {
          status: 0,
        });
        message = ids.length + " records has been unpublished.";
        break;
      case "delete":
        await productModel.removeAll(ids);
        message = ids.length + " reconds has been deleted.";
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