import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema();
const categorySchema =  new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Không được để trống",
        minLength: [3,"Tên quá ngắn"],
        maxLength: [40, "Tên không được quá 30 ký tự"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    }
}, { timeStamps: true });

export default mongoose.model("Category",categorySchema);