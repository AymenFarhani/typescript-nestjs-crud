import { Controller, Post, Get, Body } from '@nestjs/common';
import { CategoryService } from '../services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body('name') name: string) {
    return this.categoryService.createCategory(name);
  }

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }
}
