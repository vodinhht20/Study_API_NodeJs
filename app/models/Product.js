import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Không được để trống",
        minLength: [3, "Tên quá ngắn"],
        maxLength: [40, "Tên không được quá 30 ký tự"]
    },
    price: {
        type: Number,
        required: "Không được để trống",
    },
    image: {
        type: String,
        required: "Không được để trống",
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    desc: {
        type: String,
        trim: true,
        required: "Không được để trống",
        maxLength: [500, "Mô tả không được quá 500 ký tự"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    }
}, { timeStamps: true });

export default mongoose.model("Product",productSchema);