const {
  validatorMake,
  getRandomNumber,
  getHash,
  _datetime,
  sendMail,
  generatePassword,
  encrypt,
  comparePassword,
} = require("../../helper/General");
const userModel = require("../../models/apis/frontend/User");
const productModel = require("../../models/apis/frontend/Product");

const index = async (req, res) => {
  let { search } = req.query;
  let where = { status: 1 };

  if (search) {
    search = new RegExp(search, "i");
    where = {
      ...where,
      $or: [
        {
          name: search,
        },
        {
          email: search,
        },
      ],
    };
  }

  let select = {
    // _id: 1,
    // title: 1,
    // description: 1,
  };

  let data = await userModel.getListing(req, select, where);
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
    phone_number: "required",
    email: "required",
    password: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await userModel.insert(data);
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
  let { id } = req.userId;
  let data = req.body;
  let validatorRules = await validatorMake(data, {
    first_name: "required",
    last_name: "required",
    phone_number: "required",
    email: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await userModel.update(id, data);
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

  let resp = await userModel.remove(id);

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

  let resp = await userModel.get(id);

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

const like = async (req, res) => {
  let { id } = req.userId;
  let { slug } = req.body;
  console.log("slug", slug);

  let user = await userModel.get(id);

  if (user.like.includes(slug)) {
    user.like = user.like.filter((item) => item !== slug);
  } else {
    user.like.push(slug);
  }

  let resp = await user.save();

  if (resp) {
    res.send({
      status: true,
      message: "Liked Properties Updated",
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

const removeLike = async (req, res) => {
  let { id } = req.userId;
  let { slug } = req.params;
  console.log("slug", req.params);

  let user = await userModel.get(id);

  if (user.like.includes(slug)) {
    user.like = user.like.filter((item) => item !== slug);

    let resp = await user.save();
    console.log("resp", resp);

    if (resp) {
      res.send({
        status: true,
        message: "Product removed from liked items.",
        data: resp,
      });
    }
  } else {
    res.send({
      status: false,
      message: "Product not found in liked items.",
      data: [],
    });
  }
};

const wishlist = async (req, res) => {
  let { id } = req.userId;

  let user = await userModel.get(id);

  if (!user || !user.like || user.like.length === 0) {
    return res.send({
      status: false,
      message: "No liked products found in the user's wishlist.",
      data: [],
    });
  }

  let { stock, category_id, sale } = req.query.params;
  let where = { slug: { $in: user.like }, status: 1 };

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

  let joins = [
    {
      path: "category_id",
      select: "_id title",
    },
  ];

  let resp = await productModel.getListing(req, {}, where, joins);

  if (resp && resp.listing && resp.listing.length > 0) {
    res.send({
      status: true,
      message: "Wishlist products retrieved successfully.",
      data: resp.listing,
      totalCount: resp.totalCount,
      totalPages: resp.totalPages,
    });
  } else {
    res.send({
      status: false,
      message: "No products found for the given wishlist.",
      data: [],
    });
  }
};

const signUp = async (req, res) => {
  let data = req.body;
  let validatorRules = await validatorMake(data, {
    first_name: "required",
    last_name: "required",
    phone_number: "required",
    email: "required",
    password: "required|confirmed",
    password_confirmation: "required",
  });

  let passes = async () => {
    data.email_verified = null;
    data.otp = getRandomNumber(6);
    data.token = getHash(64);
    data.password = await encrypt(data.password);
    data.token_expiry_at = _datetime(null, 30);

    let resp = await userModel.insert(data);
    if (resp) {
      sendMail(data.email, "One Time Password", `<h1>${data.otp}</<h1>`);
      res.send({
        status: true,
        message: "Registration Successful",
        data: resp,
      });
    } else {
      res.send({
        status: false,
        message: "Registration Failed",
        data: [],
      });
    }
  };

  let fails = async () => {
    res.send({
      status: false,
      message: validatorRules.errors,
    });
  };

  validatorRules.checkAsync(passes, fails);
};

const signIn = async (req, res) => {
  let data = req.body;
  let validatorRules = await validatorMake(data, {
    email: "required",
    password: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await userModel.getRow({
      email: data.email,
    });

    if (resp) {
      if (resp.email_verified) {
        const isPasswordMatched = await comparePassword(
          data.password,
          resp.password
        );
        if (isPasswordMatched) {
          let update = {
            token: null,
            token_expiry_at: null,
            login_token: getHash(64),
            last_login_at: _datetime(),
            login_expiry_at: _datetime(null, 30),
          };
          let userUpdate = await userModel.update(resp._id, update);
          if (userUpdate) {
            res.send({
              status: true,
              message: "Login Successfully!",
              data: userUpdate,
            });
          } else {
            res.send({
              status: false,
              message: "Login Failed, Try Again!",
              data: [],
            });
          }
        } else {
          res.send({
            status: false,
            message: "Wrong Password!",
            data: [],
          });
        }
      } else {
        let update = { otp: "" };

        if (!resp.otp) {
          update = { opt: getRandomNumber(6) };
          let userUpdate = await userModel.update(resp._id, update);
        }

        sendMail(
          resp.email,
          "One Time Password",
          `<h1>${resp.otp ? resp.otp : update.otp}</h1>`
        );
        res.send({
          status: true,
          message: "Please verified your email",
          data: resp,
          type: "NOT_VERIFIED",
        });
      }
    } else {
      res.send({
        status: true,
        message: "User not Found",
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

const forgetPassword = async (req, res) => {
  let data = req.body;
  let validatorRules = await validatorMake(data, {
    email: "required|email",
  });

  if (!validatorRules.fails()) {
    let resp = await userModel.getRow({ email: data.email });
    if (resp) {
      if (resp.email_verified != null) {
        data.token = getHash(64);
        data.otp = getRandomNumber(6);
        data.token_expiry_at = _datetime(null, 30);
        let update = {
          otp: data.otp,
          token: data.token,
          token_expiry_at: data.token_expiry_at,
        };

        let updateResp = await userModel.update(resp._id, update);

        if (updateResp) {
          sendMail(data.email, "One Time Password", `<h1>${data.otp}</h1>`);
          res.send({
            status: true,
            message: "Please check your email for OTP",
            data: updateResp,
          });
        } else {
          res.send({
            status: false,
            message: "Failed to send email",
            data: updateResp,
          });
        }
      } else if (resp.email_verified == null) {
        let pass = generatePassword(16);
        data.password = pass.toLowerCase();
        data.token = getHash(64);
        let update = {
          password: data.password,
          token: data.token,
        };
        let updateResp = await userModel.update(resp._id, update);

        if (updateResp) {
          sendMail(
            data.email,
            "Temporary  Password",
            `<h1>${data.password}</h1>`
          );
          res.send({
            status: true,
            message: "Please check your email for Temporary Password",
            data: updateResp,
          });
        } else {
          res.send({
            status: false,
            message: "Failed to send email",
            data: updateResp,
          });
        }
      }
    } else {
      res.send({
        status: false,
        message: "Email not found",
      });
    }
  } else {
    res.send({
      status: false,
      message: "Email format invalid",
      data: validatorRules.errors,
    });
  }
};

const verifyOtp = async (req, res) => {
  let data = req.body;
  let validatorRules = await validatorMake(data, {
    token: "required",
    otp: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await userModel.getRow({
      token: data.token,
    });
    if (resp) {
      if (resp.otp == data.otp) {
        if (data.isResetPassword) {
          data.token = getHash(64);
          data.token_expiry_at = _datetime(null, 30);
        } else {
          data.token = null;
          data.token_expiry_at = null;
        }

        let update = {
          email_verified: 1,
          email_verified_at: _datetime(),
          otp: null,
          token: data.token,
          token_expiry_at: data.token_expiry_at,
        };

        let userUpdate = await userModel.update(resp._id, update);
        if (userUpdate) {
          sendMail(
            resp.email,
            "Verification complete",
            `<h1>Verification Complete</h1>`
          );
          res.send({
            status: true,
            message: "Email verified successfully!",
            data: userUpdate,
          });
        } else {
          res.send({
            status: false,
            message: "Failed to verify email",
            data: [],
          });
        }
      } else {
        res.send({
          status: false,
          message: "OTP not matched",
          data: [],
        });
      }
    } else {
      res.send({
        status: false,
        message: "Register again!",
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

const resendOtp = async (req, res) => {
  let data = req.body;
  let validatorRules = await validatorMake(data, {
    token: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await userModel.getRow({
      token: data.token,
    });
    if (resp) {
      if (!resp.otp) {
        let update = {
          otp: getRandomNumber(6),
        };
        let userUpdate = await userModel.update(resp._id, update);
        sendMail(resp.email, "One Time Password", `<h1>${update.otp}</h1>`);
        res.send({
          status: true,
          message: "Please verify your email",
          data: resp,
          type: "NOT_VERIFIED",
        });
      } else {
        sendMail(resp.email, "One Time Password", `<h1>${resp.otp}</h1>`);
        res.send({
          status: true,
          message: "OTP sent to your registered email",
          data: resp,
        });
      }
      sendMail(resp.email, "One Time Password", `<h1>${resp.otp}</h1>`);
      res.send({
        status: true,
        message: "OTP sent to your registered email",
        data: resp,
      });
    } else {
      res.send({
        status: false,
        message: "Register again!",
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

const resetPassword = async (req, res) => {
  let data = req.body;

  let validatorRules = await validatorMake(data, {
    token: "required",
    password: "required|confirmed",
    password_confirmation: "required",
  });

  if (!validatorRules.fails()) {
    let resp = await userModel.getRow({ token: data.token });

    if (resp) {
      let update = {
        token: getHash(64),
        token_expiry_at: _datetime(null, 30),
        password: await encrypt(data.password),
      };

      let updateResp = await userModel.update(resp._id, update);

      if (updateResp) {
        sendMail(
          resp.email,
          "Password Updated Successfully",
          "<h1>Your password has been updated successfully</h1>"
        );

        res.send({
          status: true,
          message: "Password updated successfully",
          data: updateResp,
        });
      } else {
        res.send({
          status: false,
          message: "Failed to update password",
          data: [],
        });
      }
    } else {
      res.send({
        status: false,
        message: "Invalid or expired token",
        data: [],
      });
    }
  } else {
    res.send({
      status: false,
      message: "Validation failed",
      data: validatorRules.errors,
    });
  }
};

const changePassword = async (req, res) => {
  let { id } = req.userId;
  let data = req.body;
  let validatorRules = await validatorMake(data, {
    old_password: "required",
    password: "required",
    password_confirmation: "required|same:password",
  });
  if (!validatorRules.fails()) {
    let userData = await userModel.getRow({ _id: id });
    if (comparePassword(data.old_password, userData.password)) {
      let update = {
        password: await encrypt(data.password),
      };
      let response = await userModel.update(userData._id, update);
      if (response) {
        // sendMail(userData.email,"Password updated",`<h1>Ypur Password was updated on ${_datetime()}</h1>`);
        res.send({
          status: true,
          message: "Password Updated",
          data: response,
        });
      } else {
        res.send({
          status: false,
          message: "Failed to change password",
          data: [],
        });
      }
    } else {
      res.send({
        status: false,
        message: "Wrong Password",
        data: [],
      });
    }
  } else {
    res.send({
      status: false,
      message: "Validation Error",
      data: [],
    });
  }
};

const logout = async (req, res) => {
  let { id } = req.userId;
  if (id) {
    let resp = await userModel.getRow({ _id: id });

    if (resp) {
      let update = {
        login_token: null,
        login_expiry_at: null,
      };
      let userUpdate = await userModel.update(resp._id, update);
      if (userUpdate) {
        res.send({
          status: true,
          message: "Logout Successfully!",
          data: userUpdate,
        });
      } else {
        res.send({
          status: false,
          message: "Logout Failed, Try Again!",
          data: [],
        });
      }
    } else {
      res.send({ status: false, message: "User not Found", data: [] });
    }
  } else {
    res.send({
      status: false,
      message: "Error occurred at our end!",
    });
  }
};

const bulkAction = async (req, res) => {
  let { type } = req.params;
  let { ids } = req.body;
  if (ids && ids.length > 0 && type) {
    switch (type) {
      case "active":
        await userModel.updateAll(ids, {
          status: 1,
        });
        message = ids.length + "records has been published.";
        break;
      case "inactive":
        await userModel.updateAll(ids, {
          status: 0,
        });
        message = ids.length + "records has been unpublished.";
        break;
      case "delete":
        await userModel.removeAll(ids);
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
  like,
  removeLike,
  wishlist,
  signUp,
  signIn,
  forgetPassword,
  verifyOtp,
  resendOtp,
  resetPassword,
  changePassword,
  logout,
  bulkAction,
};
