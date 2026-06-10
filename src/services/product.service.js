import MongoProductRepository from "../repositories/implementations/mongoProductRepository.js";
import { AppError } from "../utils/errors.js";

class ProductService {
  constructor() {
    this.productRepository = new MongoProductRepository();
  }

  async createProduct(data) {
    //price cannot be negative
    if (data.price < 0) {
      throw new AppError("Price cannot be negative", 400);
    }

    //stock cannot be negative
    if (data.stock !== undefined && data.stock < 0) {
      throw new AppError("Stock cannot be negative", 400);
    }

    return await this.productRepository.createProduct(data);
  }

  async getAllProducts(filter = {}) {
    return await this.productRepository.findAllProducts(filter);
  }

  async getProductById(id) {
    const product = await this.productRepository.findProductById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }

  async updateProduct(id, data) {
    //price cannot be negative if provided
    if (data.price !== undefined && data.price < 0) {
      throw new AppError("Price cannot be negative", 400);
    }

    //stock cannot be negative if provided
    if (data.stock !== undefined && data.stock < 0) {
      throw new AppError("Stock cannot be negative", 400);
    }

    const product = await this.productRepository.updateProduct(id, data);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }

  async deleteProduct(id) {
    const product = await this.productRepository.deleteProduct(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }
}

export default ProductService;
