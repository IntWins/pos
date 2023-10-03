import { Router } from "express"

import { verifyUser } from "../../middlewares/verify-user.middleware"
import {
  createProductController,
  deleteProductController,
  getProductController,
  updateProductController,
} from "./product.controller"

export const productRouter = Router()

productRouter.get("/", verifyUser, getProductController)
productRouter.post("/", verifyUser, createProductController)
productRouter.put("/:id", verifyUser, updateProductController)
productRouter.delete("/:id", verifyUser, deleteProductController)
