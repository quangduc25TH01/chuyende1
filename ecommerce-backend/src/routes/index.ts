import { Router } from "express";
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import categoryRouter from "./categoryRoutes";
import reviewRouter from "./reviewRouter";
import notificationRouter from "./notificationRouter";
import orderRouter from "./orderRouter";
import articleRouter from "./articleRouter";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRouter);
router.use("/review", reviewRouter);
router.use("/notifications", notificationRouter);
router.use("/order", orderRouter);
router.use("/articles", articleRouter);

export default router;
