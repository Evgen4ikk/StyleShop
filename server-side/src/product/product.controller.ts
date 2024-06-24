import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'
import { ProductService } from './product.service'

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto)
  }

  @Get()
  async getProducts() {
    return this.productService.getProducts()
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.getProductById(+id)
  }

  @Put(':id')
  @Auth()
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(+id, updateProductDto)
  }

  @Delete(':id')
  @Auth()
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(+id)
  }
}
