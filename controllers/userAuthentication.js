const bcrypt = require("bcrypt");
const User = require("../Schema/usersSchema");
const JWT = require("jsonwebtoken");

export async function registerUser(req, res, next) {
  const { name, email, password, mobile } = req.body;

  const saltBuffer = 10;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already registered...!" });
    }

    const salt = await bcrypt.genSalt(saltBuffer);
    const hashedPassword = await bcrypt.hash(password.toString(), salt);

    const newUser = await User({
      username: name,
      email: email,
      mobile: mobile,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User registered successfully...!",
    });
  } catch (error) {}
  return res.status(500).json({
    success: false,
    message: "Internal server error...!",
  });
}

export async function loginUser(req, res, next) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not registered...!" });
    }
    const isPasswordMatching = await bcrypt.compare(
      req.body.password.toString(),
      user.password
    );
    if (!isPasswordMatching) {
      return res.status(400).json({
        success: false,
        message: "Password did not match...!",
      });
    }
    const token = getTokenFromJWT(user);
    const { password, role, ...rest } = user._dock;
    return res.status(200).json({
      success: true,
      message: "User logged in successfully...!",
      token: token,
      role: role,
      data: { ...rest },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error...!",
    });
  }
}

function getTokenFromJWT(user) {
  return JWT.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "2d",
    }
  );
}
