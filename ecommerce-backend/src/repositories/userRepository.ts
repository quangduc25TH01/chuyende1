import AppDataSource from '../ormconfig';
import { User } from '../entities/User';

export const userRepository = AppDataSource.getRepository(User);
