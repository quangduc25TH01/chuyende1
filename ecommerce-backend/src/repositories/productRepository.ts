import AppDataSource from '../ormconfig';
import { Product } from '../entities/Product';

export const productRepository = AppDataSource.getRepository(Product);
