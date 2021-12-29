import slugify from "slugify";
import Product from "../models/Product";

export const create = async (req,res) => {
    try {
        const {name,category,price,image,desc} = req.body;
        const product = await new Product({name,category,price,image,desc,slug: slugify(name)}).save();
        res.json(product);
    } catch (error) {
        res.status(400).json({
            error: error,
            messenger: "Create Category Failed"
        })
    }
}
export const list = async (req,res) => {
    try {
        const products = await Product.find({}).populate("category").exec();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: error,
            messenger: "List Category Failed"
        })
    }
}
export const read = async (req,res) => {
    const product = await Product.findOne({slug: req.params.slug}).exec();
    res.json(product);
}