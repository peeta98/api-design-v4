import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

// Product Routes
router.get("/product", getProducts);
router.get("/product/:id", getProduct);
router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.put("/product/:id", body("name").isString(), handleInputErrors);
router.delete("/product/:id", deleteProduct);

// Update Routes
router.get("/update", getUpdates);
router.get("/update/:id", getUpdates);
router.post(
  "/update",
  body("title").exists(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
);
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
  body("version").optional(),
  updateUpdate
);
router.delete("/update/:id", deleteUpdate);

// UpdatePoints Routes
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").isString(),
  body("description").isString(),
  body("updateId").exists().isString()
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString()
);
router.delete("/updatepoint/:id", () => {});

router.use((err, res, req, next) => {
  console.log(err);
  res.json({ message: "Error in router handler" });
});

export default router;
