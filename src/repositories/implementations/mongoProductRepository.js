import IProductRepository from "../contracts/IProductRepository.js";
import Product from "../../models/product.model.js";
import { AppError } from "../../utils/errors.js";
import mongoose from "mongoose";

class MongoProductRepository extends IProductRepository {
  async createProduct(data) {
    try {
      const product = new Product(data);
      return await product.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError("Product with this name already exists", 409);
      }
      throw new AppError("Failed to create product", 500);
    }
  }

  async findAllProducts(filter = {}) {
    try {
      const query = {};

      if (filter.category) {
        query.category = { $regex: filter.category, $options: "i" };
      }

      if (filter.isActive !== undefined) {
        query.isActive = filter.isActive;
      } else {
        query.isActive = true; // by default only active products
      }

      return await Product.find(query).sort({ createdAt: -1 }).lean();
    } catch (error) {
      throw new AppError("Failed to fetch products", 500);
    }
  }

  async findProductById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid Product ID", 400);
    }
    try {
      return await Product.findById(id).lean();
    } catch (error) {
      throw new AppError("Failed to find product", 500);
    }
  }

  async updateProduct(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid Product ID", 400);
    }
    try {
      return await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      }).lean();
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError("Product with this name already exists", 409);
      }
      throw new AppError("Failed to update product", 500);
    }
  }

  async deleteProduct(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid Product ID", 400);
    }
    try {
      return await Product.findByIdAndDelete(id).lean();
    } catch (error) {
      throw new AppError("Failed to delete product", 500);
    }
  }
}

export default MongoProductRepository;
