import { Controller, Post, Get, Body } from '@nestjs/common';
import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('categoryId') categoryId: number,
  ) {
    return this.productService.createProduct(name, price, categoryId);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }
}
