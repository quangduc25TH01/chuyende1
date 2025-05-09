import { Request, Response } from 'express';
import { notificationsRepository } from '../repositories/notificationRepository';

export const getNotifications = async (
  req: Request,
  res: Response
): Promise<void> => {
  const unRead = req.query.unRead === 'true';

  const notifications = await notificationsRepository
    .createQueryBuilder('notifications')
    .where(unRead ? 'notifications.isRead = :isRead' : '1=1', {
      isRead: false,
    })
    .getMany();

  res.json(notifications);
};

export const getNotificationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const notification = await notificationsRepository.findOne({
    where: { id: Number(id) },
  });

  if (!notification) {
    res.status(404).json({ message: 'Notification not found' });
    return;
  }

  res.json(notification);
};

export const createNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, phone, module, content } = req.body;

    if (!name || !phone || !module || !content) {
      res.status(400).json({
        message: 'Missing required field name or phone or module or content',
      });
    }

    const newNotification = await notificationsRepository.createNotification({
      ...req.body,
    });

    res.json(newNotification);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const notification = await notificationsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!notification) {
      res.status(404).json({ message: 'Notification not found' });
      return;
    }

    await notificationsRepository.update(notification.id, req.body);

    res.json(notification);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const notification = await notificationsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!notification) {
      res.status(404).json({ message: 'Notification not found' });
      return;
    }

    await notificationsRepository.delete(notification.id);

    res.json({ message: 'Notification deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
