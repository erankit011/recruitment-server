import Joi from "joi";
import { AppError } from "../../utils/errors.js";

const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.min": "Product name must be at least 2 characters",
    "string.max": "Product name must be at most 100 characters",
    "any.required": "Product name is required",
  }),
  description: Joi.string().trim().max(500).optional().messages({
    "string.max": "Description must be at most 500 characters",
  }),
  price: Joi.number().min(0).required().messages({
    "number.min": "Price cannot be negative",
    "any.required": "Price is required",
  }),
  category: Joi.string().trim().min(2).max(50).required().messages({
    "string.min": "Category must be at least 2 characters",
    "any.required": "Category is required",
  }),
  stock: Joi.number().min(0).default(0).messages({
    "number.min": "Stock cannot be negative",
  }),
  isActive: Joi.boolean().optional(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional().messages({
    "string.min": "Product name must be at least 2 characters",
    "string.max": "Product name must be at most 100 characters",
  }),
  description: Joi.string().trim().max(500).optional().messages({
    "string.max": "Description must be at most 500 characters",
  }),
  price: Joi.number().min(0).optional().messages({
    "number.min": "Price cannot be negative",
  }),
  category: Joi.string().trim().min(2).max(50).optional().messages({
    "string.min": "Category must be at least 2 characters",
  }),
  stock: Joi.number().min(0).optional().messages({
    "number.min": "Stock cannot be negative",
  }),
  isActive: Joi.boolean().optional(),
}).min(1); //one field required for update


const validate = (schema) => (req, _res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    return next(
      new AppError(
        error.details.map((d) => d.message).join(", "),
        400
      )
    );
  }
  next();
};

export const createProductValidator = validate(createProductSchema);
export const updateProductValidator = validate(updateProductSchema);
