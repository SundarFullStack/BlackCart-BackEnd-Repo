const express = require("express");
const router = express.Router();
const ProductCollection = require("../../Models/Application/productColl");

// Api end point for insert product in product collection

router.post("/productInsert", async (req, res) => {
  try {
    const {
      productName,
      ImgUrl,
      productPrice,
      productDefn,
      productSeller,
      oldPrice,
      category,
    } = await req.body;

    console.log(
      productName,
      ImgUrl,
      productPrice,
      productDefn,
      productSeller,
      oldPrice,
      category
    );

    if (
      !productName ||
      !ImgUrl ||
      !productPrice ||
      !productDefn ||
      !productSeller ||
      !oldPrice ||
      !category
    ) {
      res.status(400).json({
        success: "false",
        message: "Please Provide all fields",
      });
    } else {
      let saveProduct = new ProductCollection({
        productName,
        ImgUrl,
        productPrice,
        productDefn,
        productSeller,
        oldPrice,
        category,
      });

      let savedProduct = await saveProduct.save();

      if (savedProduct) {
        res.status(200).json({
          success: "true",
          message: "Product saved Successfully",
          data: savedProduct,
        });
      }
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
});

// Api end point for get products from product collection

router.get("/getProduct", async (req, res) => {
  try {
    const productList = await ProductCollection.find();

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

module.exports = router;
