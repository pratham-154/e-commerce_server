const express = require("express");
const userRouter = express.Router();

const UserController = require("../../../controller/frontend/UserController");
const User = require("../../../middleware/User");

userRouter.get("/user/index", UserController.index);
userRouter.post("/user/add", UserController.add);
userRouter.put("/user/update", UserController.update);
userRouter.delete("/user/delete", UserController.remove);
userRouter.get("/user/view", User, UserController.view);

userRouter.post("/user/sign-up", UserController.signUp);
userRouter.post("/user/sign-in", UserController.signIn);
userRouter.post("/user/forget-password", UserController.forgetPassword);
userRouter.post("/user/verify-otp", UserController.verifyOtp);
userRouter.post("/user/resend-otp", UserController.resendOtp);
userRouter.post("/user/reset-password", UserController.resetPassword);
userRouter.post("/user/logout", UserController.logout);

module.exports = userRouter;
