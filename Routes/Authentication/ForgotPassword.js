const router = require("express").Router();
const User = require("../../Models/Authentication/User");
const { sendMail } = require("../../Controllers/sendMail");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
//API for receiving mail and share UI path for updating password

router.post("/", async (req, res) => {
  try {
    const { email } = await req.body;
    console.log(email);

    const userExist = await User.findOne({ email: email });

    console.log("user", userExist);

    const token = await generateToken(email);

    console.log("out", token);

    if (!userExist) {
      res.status(201).json({
        success: false,
        message: "Invalid Email Id",
      });
    } else {
      const activationLink = `https://blackcart-3dbe9.web.app/FPUpdate/${token}`;

      const content = `<!DOCTYPE html>
            <html>
              <head> </head>
              <body>
                <div
                  style="
                    width: 100%;
                    background-color: #fff;
                    box-shadow: 0px 4px 8px 0px #757575;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px;
                  "
                >
                  <div class="row">
                    <div
                      style="
                        margin-top: 25px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                      class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    >
                    <h2 style="color: black">BlackCart Web Application</h2>
                    </div>
            
                    <div
                      style="width: 600px; height: 300px"
                      class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    >
                      <img
                        src="https://t4.ftcdn.net/jpg/06/44/52/09/360_F_644520910_0qAcxInM49OxJaDZ4lhmh3TmHEIj4sOr.jpg"
                        style="width: 100%; height: 100%"
                      />
                    </div>
                    <div>
                    <h3>Hi, there</h3>
                    <p style="color:gray; font-weight:700;font-size:23px;">Welcome to the app</p>
                    <p style="font-size:20px">Click on the below link to change your password.</p>
                    <a href="${activationLink}" style="text-decoration: none;background-color: #1a73e8;padding:10px 30px;color:#fff;font-weight: 600;border-radius:4px">Click Here</a>
                    <p  style="font-size:17px;font-weight:600">Regards</p>
                    <p style="font-size:17px;font-weight:600">Sundar</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
            `;

      sendMail(email, "Change Password", content);

      res.status(200).json({
        success: true,
        message: "Password Updating Mail send successfully",
      });
    }
  } catch (error) {
    console.log("Error Occurred:", error);

    res.status(500).json({
      success: false,
      Error: error,
    });
  }
});

// Token Generator
const generateToken = async (email) => {
  const token = await jwt.sign(email, process.env.forgot_Pass_token);
  // console.log("token",token)
  return token;
};

module.exports = router;
