
import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExportExcelService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async generateProductExcel(): Promise<Buffer> {
    const products = await this.productRepository.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Price', key: 'price', width: 15 },
      { header: 'Category', key: 'category', width: 20 },
    ];

    products.forEach((product) => {
      worksheet.addRow({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category?.name || 'N/A',
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer as Buffer;
  }
}
