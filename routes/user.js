import express from "express";
import { requiredSignin,isAuth, isAdmin } from "../app/controllers/AuthController";
import { read, userById } from "../app/controllers/UserController";
const router = express.Router();

// kiểm tra là admin
router.get("/user/secret/:userId",requiredSignin,isAuth,isAdmin,read);
// đoc thông tin thành viên
router.get("/user/:userId",requiredSignin,isAuth,read);
router.param('userId', userById);
module.exports = router;