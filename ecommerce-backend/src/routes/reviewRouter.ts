import { Router } from 'express';
import {
  createReviewProduct,
  deleteReviewProduct,
  getReviewProduct,
  getReviewProductById,
  updateReviewProduct,
} from '../controllers/reviewController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', isAuthenticated, getReviewProduct);
router.get('/:id', getReviewProductById);
router.post('/:id', createReviewProduct);
router.patch('/:id', isAuthenticated, updateReviewProduct);
router.delete('/:id', isAuthenticated, deleteReviewProduct);

export default router;
