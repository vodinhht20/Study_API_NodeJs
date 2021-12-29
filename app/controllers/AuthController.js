import jwt from "jsonwebtoken";
import User from "../models/Auth";
import expressJwt from "express-jwt";

export const signup = async (req,res) => {
    try {
        const {email, full_name,password} = req.body;
        const user = await new User({email, full_name,password}).save();
        res.json(user);
    } catch (error) {
        res.json({
            error: error,
            messenger: "Tạo tài khoản thất bại"
        })
    }
    
}
export const signin = async (req,res) => {
    const {email,password} = req.body;
   const user = await User.findOne({email}).exec();
   if (!user) {
        res.json({
            messenger: "Tài khoản không tồn tại"
        });
   }
   if (!user.authenticate(password)) {
       res.json({
           messenger: "Tài khoản hoặc mật khẩu không chính xác"
       });
   }

   const token = jwt.sign({_id: user._id},"123456");
   res.cookie("token",token,{expire: new Date() + 9999});

    res.json({
        token,
        user: {
            _id: user._id,
            full_name: user.full_name,
            role: user.role,
            avatar: user.avatar
        }
    });
}
export const signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        messenger: "Đăng xuất thành công"
    })
}

export const requiredSignin = expressJwt({
    secret: "123456",
    algorithms: ["HS256"],
    userProperty: "auth"
});


export const isAuth = (req, res, next) => {
    // Kiểm tra điều kiện trả về true hoặc false
    let user = req.profile && req.auth && req.profile._id == req.auth._id;

    // Nếu false ( không phải thành viên hệ thống)
    if (!user) {
        res.json({
            msg: "Access Denined"
        })
    }
    next();
}
export const isAdmin = (req, res, next) => {
    console.log(req.profile.role);
    // nếu role == 0 ( nghĩa là quyền là member thì thông báo)
    if (req.profile.role === 0) {
        return res.status(403).json({
            msg: "Bạn không có quyền truy cập"
        })
    }
    next();
}