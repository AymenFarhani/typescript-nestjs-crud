
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Category } from '../src/entities/category.entity';
import { Product } from '../src/entities/product.entity';
export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'products',
  entities: [Category, Product],
  synchronize: true,
};
