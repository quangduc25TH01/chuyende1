import AppDataSource from '../ormconfig';
import { Article } from '../entities/Article';

export const articleRepository = AppDataSource.getRepository(Article);
