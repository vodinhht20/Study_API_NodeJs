import express from "express";
import { create, list, read } from "../app/controllers/ProductController";
import { demo } from "../app/middlewares/demo";
import { requiredSignin,isAuth, isAdmin } from "../app/controllers/AuthController";
import {userById} from "../app/controllers/UserController";
const router = express.Router();

router.post("/product/:userId",requiredSignin,isAuth,isAdmin, create);
router.get("/products", list);
router.get("/products/:slug", read);

router.param('userId', userById);

module.exports = router;