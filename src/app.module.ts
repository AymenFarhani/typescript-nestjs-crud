import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'USERNAME',
      password: 'PASSWORD',
      database: 'DB_NAME',
      entities: [Category, Product],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Category, Product]),
  ],
  controllers: [CategoryController, ProductController],
  providers: [CategoryService, ProductService],
})
export class AppModule {}
