import { Controller, Post, Get, Body, Put, Param, Delete } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../entities/category.entity';

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

  @Get(':id')
  findCategoryById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findCategoryById(id);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: number,
    @Body() category: Partial<Category>,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, category);
  }


  @Delete(':id')
  deleteCategory(@Param('id') id: number): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
