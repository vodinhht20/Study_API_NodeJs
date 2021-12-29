import mongoose from "mongoose";
import {v4 as uuid4} from "uuid";
import { createHmac } from "crypto";
// import

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: "Không được để trống",
        maxlength: [35,"Tên không được quá 35 ký tự"],
        trim: true,
        minlength: [3,"Tên quá ngắn"]
    },
    email: {
        type: String,
        required: "Không được để trống",
        unique: true,
        trim: true
    },
    hashed_password: {
        type: String,
    },
    salt: {
        type: String
    },
    avatar: {
        type: String,
    },
    role: {
        type: Number,
        default: 0
    }
},{timeStamps: true});

userSchema.virtual('password')
    .set(function (password) {
        this.salt = uuid4();
        this.hashed_password = this.encryPassword(password);
    });
userSchema.methods =  {
    authenticate(password) {
        return this.encryPassword(password) == this.hashed_password;
    },
    encryPassword(password) {
        if (!password) return;
        try {
            return createHmac('sha256', this.salt)
                    .update(password)
                    .digest("hex");
        } catch (error) {
            console.log(error);
        }
    }
}

export default mongoose.model("User",userSchema);