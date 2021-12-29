import slugify from "slugify";
import Category from "../models/Category";

export const create = async (req,res) => {
    try {
        const {name} = req.body;
        const category = await new Category({name,slug: slugify(name)}).save();
        res.json(category);
    } catch (error) {
       res.status(400).json({
           error: error,
           messenger: "Create Category Failed"
       }) 
    }
    
    
}
export const list = (req,res) => {
    console.log("oke")
}
export const read = (req,res) => {
    console.log("oke")
}
export const update = (req,res) => {
    console.log("oke")
}
export const remove = (req,res) => {
    console.log("oke")
}