const { aboutUs } = require("../../index");

const get = async (id, select = [], joins = []) => {
  try {
    let record = aboutUs.findById(id, select);

    if (joins) {
      record = record.populate(joins);
    }

    record = await record.exec();

    return record;
  } catch (error) {
    return false;
  }
};

module.exports = { get };
