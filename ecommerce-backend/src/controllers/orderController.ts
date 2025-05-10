import { Request, Response } from "express";
import { OrderItem } from "../entities/OrderItem";
import { orderItemRepository } from "../repositories/orderItemRepository";
import { orderRepository } from "../repositories/ordersRepository";
import { productRepository } from "../repositories/productRepository";
import { OrderStatus } from "../entities/shares/enum/OrderStatus";
import { notificationsRepository } from "../repositories/notificationRepository";
import { ModuleNotification } from "../entities/shares/enum/ModuleNotification";

export const getOrders = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await orderRepository.find({
      relations: ["orderItems", "orderItems.product"],
    });

    res.json(orders);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getOrderDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await orderRepository.findOne({
      where: { id: parseInt(id) },
      relations: ["orderItems", "orderItems.product"],
    });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json(order);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getOrderDetailsByOrderIds = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { orderIds } = req.body;
    if (!orderIds || !Array.isArray(orderIds)) {
      res.status(400).json({ message: "orderIds must be an array" });
      return;
    }

    if (orderIds.length === 0) {
      res.json([]);
    }

    const orders = await orderRepository
      .createQueryBuilder("order")
      .where("order.orderId IN (:...orderIds)", { orderIds })
      .leftJoin("order.orderItems", "orderItems")
      .leftJoin("orderItems.product", "product")
      .select([
        "order.id",
        "order.orderId",
        "order.status",
        "order.createdAt",
        "orderItems.id",
        "orderItems.quantity",
        "orderItems.price",
        "product.id",
        "product.name",
        "product.code",
      ])
      .orderBy("order.createdAt", "ASC")
      .getMany();

    res.json(orders);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      name,
      address,
      phone,
      email,
      note,
      status,
      orderItems,
      paidStatus,
    } = req.body; // orderItems: [{ productId, quantity, price, unit_of_measure }]

    const newOrder = orderRepository.create({
      orderId: Date.now().toString(),
      name,
      address,
      phone,
      email,
      note,
      status: status || OrderStatus.PENDING,
      paidStatus: paidStatus || false,
    });

    const order = await orderRepository.save(newOrder);

    for (const item of orderItems) {
      const product = await productRepository.findOneBy({
        id: item.productId,
      });

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      const orderItem = new OrderItem();
      orderItem.order = order;
      orderItem.product = product;
      orderItem.quantity = item.quantity;
      orderItem.price = product.price * item.quantity;
      await orderItemRepository.save(orderItem);
    }

    await notificationsRepository.createNotification({
      name,
      email,
      phone,
      module: ModuleNotification.ORDER,
      content: `Đơn hàng mới từ ${name}, Số điện thoại: ${phone}, Địa chỉ: ${address}, Ghi chú: ${note}`,
    });

    res.status(201).json(order);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const order = await orderRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    const newOrder = orderRepository.merge(order, data);
    await orderRepository.save(newOrder);

    res.json(order);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
