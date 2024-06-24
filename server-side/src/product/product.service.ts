import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: CreateProductDto) {
    const {
      name,
      price,
      description,
      images,
      stock,
      categoryId,
      subcategoryId,
    } = data

    const existingCategory = await this.prisma.category.findUnique({
      where: { id: categoryId },
    })

    if (!existingCategory) {
      throw new NotFoundException(`Категория с ID ${categoryId} не найдена`)
    }

    const existingSubcategory = await this.prisma.subcategory.findUnique({
      where: { id: subcategoryId },
    })

    if (!existingSubcategory) {
      throw new NotFoundException(
        `Подкатегория с ID ${subcategoryId} не найдена`,
      )
    }

    return this.prisma.product.create({
      data: {
        name,
        price,
        description,
        images,
        stock,
        category: { connect: { id: categoryId } },
        subcategory: { connect: { id: subcategoryId } },
      },
      include: { category: true, subcategory: true },
    })
  }

  async getProducts() {
    return this.prisma.product.findMany({
      include: { category: true, subcategory: true },
    })
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true, subcategory: true },
    })

    if (!product) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`)
    }

    return product
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const {
      name,
      price,
      description,
      images,
      stock,
      categoryId,
      subcategoryId,
    } = data

    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`)
    }

    if (name !== undefined) {
      const existingProductWithName = await this.prisma.product.findFirst({
        where: { name, NOT: { id } },
      })

      if (existingProductWithName) {
        throw new ConflictException('Продукт с таким именем уже существует')
      }
    }

    if (categoryId !== undefined) {
      const existingCategory = await this.prisma.category.findUnique({
        where: { id: categoryId },
      })

      if (!existingCategory) {
        throw new NotFoundException(`Категория с ID ${categoryId} не найдена`)
      }
    }

    if (subcategoryId !== undefined) {
      const existingSubcategory = await this.prisma.subcategory.findUnique({
        where: { id: subcategoryId },
      })

      if (!existingSubcategory) {
        throw new NotFoundException(
          `Подкатегория с ID ${subcategoryId} не найдена`,
        )
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description,
        images,
        stock,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        subcategory: subcategoryId
          ? { connect: { id: subcategoryId } }
          : undefined,
      },
    })
  }

  async deleteProduct(id: number) {
    const existingProduct = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`)
    }

    return this.prisma.product.delete({
      where: { id },
    })
  }
}
