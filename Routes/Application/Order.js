const express = require("express");
const router = express.Router();
const OrderCollection = require("../../Models/Application/OrderColl");

// Api end point for insert product in product collection

router.post("/insertOrderProduct", async (req, res) => {
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
    //   category,
    //   OrderQty
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
      let strWithoutCommas = productPrice.replace(/,/g, "");

      const TotalPrice = (await parseInt(strWithoutCommas)) * OrderQty;

      // console.log("TotalPrice", TotalPrice);
      let saveProduct = new OrderCollection({
        UserId,
        productName,
        ImgUrl,
        productPrice,
        productDefn,
        productSeller,
        oldPrice,
        category,
        OrderQty,
        TotalPrice,
      });

      let savedProduct = await saveProduct.save();

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

router.get("/getOrderProduct/:UserId", async (req, res) => {
  try {
    const { UserId } = req.params;

    const productList = await OrderCollection.find({ UserId: UserId });

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

//API for Delete ordered F items

router.delete("/deleteOrderProduct/:id/:UserId", async (req, res) => {
  try {
    const { id } = req.params;
    const { UserId } = req.params;
    // console.log(id)

    const deletedOrderItems = await OrderCollection.deleteOne({
      _id: id,
      UserId: UserId,
    });
    console.log(deletedOrderItems);
    if (deletedOrderItems) {
      res.status(200).json({
        success: true,
        message: "Product deleted from Order",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Error in deleting product from Order",
      });
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});

module.exports = router;
