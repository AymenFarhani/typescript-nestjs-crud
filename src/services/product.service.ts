import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}


  async createProduct(name: string, price: number, categoryId: number): Promise<Product> {
    const category = await this.categoryRepository.findOne({
      where: { id: 1 },
    });

    const product = new Product();
    product.name = name;
    product.price = price;
    product.category = category;
    return await this.productRepository.save(product);
  }


  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] });
  }
}
