import { Router } from "express";
import multer from "multer";
import path from "path";

import { isAuthenticated } from "../middlewares/authMiddleware";
import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  updateArticle,
} from "../controllers/articleController";

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

router.get("/", isAuthenticated, getArticles);
router.get("/:slug", getArticle);
router.post("/", isAuthenticated, upload.single("file"), createArticle);
router.patch("/:id", isAuthenticated, upload.single("file"), updateArticle);
router.delete("/:id", isAuthenticated, deleteArticle);

export default router;
