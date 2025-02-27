import { Controller, Post, Get, Body, Param, Put, Delete, Res } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';
import { ExportExcelService } from '../services/export-excel.service';
import { Response } from 'express';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly exportExcelService: ExportExcelService) {}

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

  @Get(':id')
  findProductById(@Param('id') id: number): Promise<Product> {
    return this.productService.findProductById(id);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() product: Partial<Product>,
  ): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }

  @Get('export')
  async exportProducts(@Res() res: Response) {
    try {
      const excelBuffer = await this.exportExcelService.generateProductExcel();

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');

      res.send(excelBuffer);
    } catch (error) {
      res.status(500).send({ message: 'Error generating the Excel file', error });
    }
  }
}
