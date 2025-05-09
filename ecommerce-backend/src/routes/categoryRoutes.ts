import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  createCategory,
  updateCategory,
  removeCategory,
  getCategories,
  getCategoryBySlug,
} from "../controllers/categoryController";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = Router();
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

router.get("/", isAuthenticated, getCategories);
router.get("/:slug", isAuthenticated, getCategoryBySlug);

router.post(
  "/",
  isAuthenticated,
  upload.fields([{ name: "logo" }, { name: "image" }]),
  createCategory
);

router.patch(
  "/:id",
  isAuthenticated,
  upload.fields([{ name: "logo" }, { name: "image" }]),
  updateCategory
);
router.delete("/:id", isAuthenticated, removeCategory);

export default router;
