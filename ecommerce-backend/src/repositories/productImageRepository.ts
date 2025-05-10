import { ProductImage } from '../entities/ProductImage';
import AppDataSource from '../ormconfig';

export const productImageRepository = AppDataSource.getRepository(ProductImage);
