import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  updateProductImageUsed,
  searchProducts,
  getProductBySlug,
} from "../controllers/productController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();
router.get("/search", searchProducts);

const upload = multer({
  dest: "tmp/uploads/",
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
  fileFilter: (_req, file, cb) => {
    if (!/\.(jpg|jpeg|png|gif|svg)$/i.test(path.extname(file.originalname))) {
      return cb(
        new Error(
          "Uploaded File is not a valid. Only JPG, JPEG, PNG, GIF, SVG files are allowed."
        )
      );
    }

    cb(null, true);
  },
});

router.get("/", isAuthenticated, getProducts);
router.get("/:slug", isAuthenticated, getProductBySlug);
router.post("/", isAuthenticated, upload.array("files", 10), createProduct);
router.patch("/:id", isAuthenticated, upload.array("files", 10), updateProduct);
router.delete("/:id", isAuthenticated, deleteProduct);
router.patch("/used-image/:id", isAuthenticated, updateProductImageUsed);

export default router;
