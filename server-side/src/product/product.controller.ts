import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
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
  async getProducts(
    @Query('bestseller') bestseller?: string,
    @Query('categoryId') categoryId?: string,
    @Query('subcategoryId') subcategoryId?: string,
    @Query('id') id?: string,
    @Query('slug') slug?: string,
    @Query('categorySlug') categorySlug?: string,
  ) {
    const params = {
      bestseller: bestseller === 'true' ? true : undefined,
      categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
      subcategoryId: subcategoryId ? parseInt(subcategoryId, 10) : undefined,
      id: id ? parseInt(id, 10) : undefined,
      slug,
      categorySlug,
    }

    return this.productService.getProducts(params)
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
