const express = require("express");
const userRouter = express.Router();

const UserController = require("../../../controller/admin/UserController");

userRouter.get("/admin/user/index", UserController.index);
userRouter.post("/admin/user/add", UserController.add);
userRouter.put("/admin/user/update", UserController.update);
userRouter.delete("/admin/user/delete", UserController.remove);
userRouter.get("/admin/user/view", UserController.view);

userRouter.post("/admin/user/sign-up", UserController.signUp);
userRouter.post("/admin/user/sign-in", UserController.signIn);
userRouter.post("/admin/user/forget-password", UserController.forgetPassword);
userRouter.post("/admin/user/verify-otp", UserController.verifyOtp);
userRouter.post("/admin/user/resend-otp", UserController.resendOtp);
userRouter.post("/admin/user/reset-password", UserController.resetPassword);
userRouter.post("/admin/user/logout", UserController.logout);

module.exports = userRouter;
