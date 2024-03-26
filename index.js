const express = require("express");
const app = express();
const port = 8050;
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./DBConnection/dbConnection");
connectDB();
const SignupRouter = require("./Routes/Authentication/SignUp");
const LoginRouter = require("./Routes/Authentication/Login");
const ForgotPasswordRouter = require("./Routes/Authentication/ForgotPassword");
const FPUpdateRouter = require("./Routes/Authentication/FPUpdate");
const UserValidRouter = require("./Routes/Application/UserValidation");
const productRouter = require("./Routes/Application/product");
const CartRouter = require("./Routes/Application/Cart");
const OrderRouter = require("./Routes/Application/Order");

dotenv.config();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Server Started Successfully 😀");
});

app.use("/signup", SignupRouter);

app.use("/login", LoginRouter);

app.use("/forgotpassword", ForgotPasswordRouter);

app.use("/FPUpdate", FPUpdateRouter);

app.use("/validUser", UserValidRouter);

app.use("/Order", OrderRouter);

app.use("/Cart", CartRouter);

app.use("/product", productRouter);

app.listen(port, () => {
  console.log(`Server Started Successfully in the ${port}`);
});
