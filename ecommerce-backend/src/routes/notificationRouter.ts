import { Router } from 'express';

import { isAuthenticated } from '../middlewares/authMiddleware';
import {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  getNotificationById,
} from '../controllers/notificationController';

const router = Router();

router.get('/', isAuthenticated, getNotifications);
router.get('/:id', isAuthenticated, getNotificationById);
router.post('/', createNotification);
router.patch('/:id', isAuthenticated, updateNotification);
router.delete('/:id', isAuthenticated, deleteNotification);

export default router;
