const User = require("../Models/Authentication/User");
const VerifyUser = require("../Models/Authentication/VerifyUser");
const { sendMail } = require("./sendMail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Controller for validating User Is He is already exist or not?

const CheckUser = async (email) => {
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
};

// Controller for saving verifying User

const InsertVerifyUser = async (name, email, password) => {
  try {
    const userExist = await User.findOne({ email: email });

    // console.log("userExist", userExist);

    if (!userExist) {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      const token = await TokenGenerator(email);

      if (token) {
        const newVerifyUser = new VerifyUser({
          name: name,
          email: email,
          password: hashedPassword,
          token: token,
        });

        const activationLink = `https://blackcart-backend-repo.onrender.com/signup/${token}`;

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
                    <p style="font-size:20px">Thank You for signing Up, Click on the below link to activate your account.</p>
                    <a href="${activationLink}" style="text-decoration: none;background-color: #1a73e8;padding:10px 30px;color:#fff;font-weight: 600;border-radius:4px">Click Here</a>
                    <p  style="font-size:17px;font-weight:600">Regards</p>
                    <p style="font-size:17px;font-weight:600">Sundar</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
            `;

        const savedVerifyUser = await newVerifyUser.save();

        sendMail(email, "VerifyUser", content);

        return savedVerifyUser;
      }
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
};

// Token Generator using JSON

const TokenGenerator = async (email) => {
  try {
    const token = await jwt.sign(email, process.env.Signup_Secretkey);

    if (token) {
      return token;
    }
  } catch (error) {
    console.log("Erro Occured:", error);
  }
};

// Controller for saving verified user in "user" collection and delete him/her in verified user collection

const InsertSignUpUser = async (token) => {
  try {
    const userExist = await VerifyUser.findOne({ token: token });

    console.log("userExist", userExist);

    if (userExist) {
      const saveUser = new User({
        name: userExist.name,
        email: userExist.email,
        password: userExist.password,
        token: userExist.token,
      });

      const savedUser = await saveUser.save();

      await VerifyUser.deleteOne({ token: token });

      // console.log("savedUser",savedUser);

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
            <p style="font-size:20px">Registration Successful</p>
            <p style="font-size:20px;">You are successfully register!!!</p>
            <p  style="font-size:17px;font-weight:600">Regards</p>
            <p style="font-size:17px;font-weight:600">Sundar</p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;

      sendMail(userExist.email, "User Registered", content);

      return savedUser;
    } else {
      return;
      `<!DOCTYPE html>
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
                    <p style="font-size:20px">Registration Failed</p>
                    <p style="font-size:20px;color:red;">Link Expired.....</p>
                    <p  style="font-size:17px;font-weight:600">Regards</p>
                    <p style="font-size:17px;font-weight:600">Sundar</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
            `;
    }
  } catch (error) {
    console.log("Error Occurred:", error);
    return;
    `<!DOCTYPE html>
              <html>
                <head> </head>
                <body>
                  <div
                    style="
                      width: 100%;
                      background-color: whitesmoke;
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
                      <p style="font-size:20px">Registration Failed</p>
                      <p style="font-size:20px;color:red;">Unexpected Error Happened....</p>
                      <p  style="font-size:17px;font-weight:600">Regards</p>
                      <p style="font-size:17px;font-weight:600">Sundar</p>
                      </div>
                    </div>
                  </div>
                </body>
              </html>
              `;
  }
};

module.exports = {
  CheckUser,
  InsertVerifyUser,
  InsertSignUpUser,
  TokenGenerator,
};
