import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}


  async createCategory(name: string): Promise<Category> {
    const category = new Category();
    category.name = name;
    return await this.categoryRepository.save(category);
  }


  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
