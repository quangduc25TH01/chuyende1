import AppDataSource from '../ormconfig';
import { Category } from '../entities/Category';

export const categoriesRepository = AppDataSource.getRepository(Category);
