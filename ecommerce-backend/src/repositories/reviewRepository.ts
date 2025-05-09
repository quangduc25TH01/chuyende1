import { Review } from '../entities/Review';
import AppDataSource from '../ormconfig';

export const reviewRepository = AppDataSource.getRepository(Review);
