const { getBearerToken } = require("../helper/General");
const { checkToken } = require("../models/apis/frontend/User");

const User = async (req, res, next) => {
  let token = getBearerToken(req);
  if (token) {
    let userData = await checkToken(token);
    if (userData) {
      req.userId = userData;
      next();
    } else {
      res.status(401).send({
        status: false,
        message: "User not logged in",
      });
    }
  } else {
    res.status(401).send({
      status: false,
      message: "User not logged in",
    });
  }
};

module.exports = User;
