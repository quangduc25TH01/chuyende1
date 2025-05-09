import { Request, Response } from 'express';
import { reviewRepository } from '../repositories/reviewRepository';
import { productRepository } from '../repositories/productRepository';

export const getReviewProduct = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const reviews = await reviewRepository
    .createQueryBuilder('reviews')
    .innerJoin('reviews.product', 'product')
    .select([
      'reviews.id',
      'reviews.name',
      'reviews.email',
      'reviews.comment',
      'reviews.rating',
      'reviews.isRemoved',
      'reviews.createdAt',
      'product.id',
      'product.name',
    ])
    .orderBy('reviews.createdAt', 'ASC')
    .getMany();

  res.json(reviews);
};

export const getReviewProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { client } = req.query;
  const reviewQuery = reviewRepository
    .createQueryBuilder()
    .where('productId = :productId', { productId: req.params.id });

  if (client) {
    reviewQuery.andWhere('isRemoved = :isRemoved', { isRemoved: false });
  }

  const reviews = await reviewQuery.getMany();

  res.json(reviews);
};

export const createReviewProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, email, comment, rating } = req.body;

  if (!name || !email || !comment) {
    res.status(400).json({ message: 'Name and email are required' });
    return;
  }

  // check if product exists
  const product = await productRepository.findOne({
    where: { id: Number(id) },
  });

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  const newReview = reviewRepository.create({
    name,
    email,
    comment,
    rating,
    product: { id: Number(id) },
  });

  await reviewRepository.save(newReview);

  res.json(newReview);
};

export const updateReviewProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const review = await reviewRepository.findOne({
      where: { id: Number(id) },
    });

    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    const newReview = reviewRepository.merge(review, {
      ...req.body,
    });

    await reviewRepository.save(newReview);

    res.json(review);
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ message: 'Error updating review' });
  }
};

export const deleteReviewProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const review = await reviewRepository.findOne({
      where: { id: Number(id) },
    });

    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    review.isRemoved = req.body.isRemoved;
    await reviewRepository.save(review);

    res.json({ message: 'Review removed' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ message: 'Error deleting review' });
  }
};
