import express from "express";
import productController from "../controllers/product.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import {
  createProductValidator,
  updateProductValidator,
} from "../middlewares/validators/product.validator.js";

const router = express.Router();

// Product CRUD
// Create product
router.post(
  "/create",
  authenticateJWT,
  createProductValidator,
  productController.createProduct
);

// Get all products
router.get(
  "/get-all",
  authenticateJWT,
  productController.getAllProducts
);

// Get product by ID
router.get(
  "/get/:id",
  authenticateJWT,
  productController.getProductById
);

// Update product
router.put(
  "/update/:id",
  authenticateJWT,
  updateProductValidator,
  productController.updateProduct
);

// Delete product
router.delete(
  "/delete/:id",
  authenticateJWT,
  productController.deleteProduct
);

export default router;
