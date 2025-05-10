import { Router } from "express";

import { isAuthenticated } from "../middlewares/authMiddleware";
import {
  createOrder,
  getOrderDetails,
  getOrderDetailsByOrderIds,
  getOrders,
  updateOrder,
} from "../controllers/orderController";

const router = Router();

router.get("/", isAuthenticated, getOrders);
router.get("/:id", isAuthenticated, getOrderDetails);
router.post("/detail-by-order-ids", getOrderDetailsByOrderIds);
router.post("/", createOrder);
router.patch("/:id", isAuthenticated, updateOrder);

export default router;
