import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { CategoryController } from './controllers/category.controller';
import { ProductController } from './controllers/product.controller';
import { ormConfig } from '../config/ormconfig';
import { ExportExcelService } from './services/export-excel.service';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([Category, Product]),
  ],
  controllers: [CategoryController, ProductController, AppController],
  providers: [CategoryService, ProductService, ExportExcelService, AppService],
})
export class AppModule {}
