const express = require("express");
const router = express.Router();
const CartCollection = require("../../Models/Application/CartColl");

// Api end point for insert product in product collection

router.post("/insertCartProduct", async (req, res) => {
  try {
    const {
      UserId,
      productName,
      ImgUrl,
      productPrice,
      productDefn,
      productSeller,
      oldPrice,
      category,
      OrderQty,
    } = await req.body;

    // console.log(
    //   productName,
    //   ImgUrl,
    //   productPrice,
    //   productDefn,
    //   productSeller,
    //   oldPrice,
    //   category
    // );

    if (
      !UserId ||
      !productName ||
      !ImgUrl ||
      !productPrice ||
      !productDefn ||
      !productSeller ||
      !oldPrice ||
      !category ||
      !OrderQty
    ) {
      res.status(400).json({
        success: "false",
        message: "Please Provide all fields",
      });
    } else {
      let saveProduct = new CartCollection({
        UserId,
        productName,
        ImgUrl,
        productPrice,
        productDefn,
        productSeller,
        oldPrice,
        category,
        OrderQty,
      });

      let savedProduct = await saveProduct.save();

      console.log(savedProduct);
      if (savedProduct) {
        res.status(200).json({
          success: "true",
          message: "Product saved Successfully",
          savedData: savedProduct,
        });
      }
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});

// Api end point for get products from product collection

router.get("/getCartProduct/:UserId", async (req, res) => {
  try {
    const { UserId } = req.params;
    // console.log(UserId);
    const productList = await CartCollection.find({ UserId: UserId });

    // console.log(productList);

    if (productList) {
      res.status(200).json({
        success: true,
        message: "Products List fetched successfully",
        List: productList,
      });
    } else {
      res.status(201).json({
        success: false,
        message: "Error in fetching product list",
      });
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});

//API for Delete Cart items

router.delete("/deleteCartProduct/:id/:UserId", async (req, res) => {
  try {
    const { id } = await req.params;
    const { UserId } = await req.params;
    // console.log(id)

    const deletedCartItems = await CartCollection.deleteOne({
      _id: id,
      UserId: UserId,
    });
    console.log(deletedCartItems);
    if (deletedCartItems) {
      res.status(200).json({
        success: true,
        message: "Product deleted from cart",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Error in deleting product from cart",
      });
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});

module.exports = router;
