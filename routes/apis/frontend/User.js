const express = require("express");
const userRouter = express.Router();

const UserController = require("../../../controller/frontend/UserController");
const User = require("../../../middleware/User");

userRouter.get("/user/index", UserController.index);
userRouter.post("/user/add", UserController.add);
userRouter.put("/user/update", User, UserController.update);
userRouter.delete("/user/delete", UserController.remove);
userRouter.get("/user/view", User, UserController.view);

userRouter.post("/user/like", User, UserController.like);
userRouter.delete("/user/removeLike/:slug", User, UserController.removeLike);
userRouter.get("/user/wishlist", User, UserController.wishlist);
userRouter.post("/user/sign-up", UserController.signUp);
userRouter.post("/user/sign-in", UserController.signIn);
userRouter.post("/user/forget-password", UserController.forgetPassword);
userRouter.post("/user/verify-otp", UserController.verifyOtp);
userRouter.post("/user/resend-otp", UserController.resendOtp);
userRouter.post("/user/reset-password", UserController.resetPassword);
userRouter.post("/user/change-password", User, UserController.changePassword);
userRouter.post("/user/logout", User, UserController.logout);

module.exports = userRouter;
