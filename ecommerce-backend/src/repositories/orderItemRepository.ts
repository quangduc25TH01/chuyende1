import AppDataSource from '../ormconfig';
import { OrderItem } from '../entities/OrderItem';

export const orderItemRepository = AppDataSource.getRepository(OrderItem);
