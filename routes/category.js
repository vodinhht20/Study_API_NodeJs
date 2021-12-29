import express from "express";
import {list, read,remove,update,create} from "../app/controllers/CategoryController";

const router = express.Router();

router.get("/categories",list);
router.get("/category/:slug",read);
router.post("/category",create);
router.patch("/category/:slug",update);
router.delete("/category/:slug",remove);

module.exports = router;