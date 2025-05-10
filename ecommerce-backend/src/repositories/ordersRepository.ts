import AppDataSource from '../ormconfig';
import { Order } from '../entities/Order';

export const orderRepository = AppDataSource.getRepository(Order);
