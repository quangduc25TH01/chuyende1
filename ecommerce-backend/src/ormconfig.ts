import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/entities/**/*.ts'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: false,
});

export default AppDataSource;
