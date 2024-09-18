import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
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
      isBestseller,
      categoryId,
      subcategoryId,
    } = data

    if (!categoryId) {
      throw new ConflictException('Отсутствует ID категории')
    }

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
        slug: generateSlug(name),
        price,
        description,
        images,
        stock,
        isBestseller,
        category: { connect: { id: categoryId } },
        subcategory: { connect: { id: subcategoryId } },
      },
      include: { category: true, subcategory: true },
    })
  }

  async getProducts(params: {
    bestseller?: boolean
    categoryId?: number
    subcategoryId?: number
    id?: number
    slug?: string
    categorySlug?: string
  }) {
    const { bestseller, categoryId, subcategoryId, id, slug, categorySlug } =
      params

    if (id) {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: { category: true, subcategory: true },
      })

      if (!product) {
        throw new NotFoundException(`Продукт с ID ${id} не найден`)
      }

      return product
    }

    if (slug) {
      const product = await this.prisma.product.findUnique({
        where: { slug },
        include: { category: true, subcategory: true },
      })

      if (!product) {
        throw new NotFoundException(`Продукт с slug ${slug} не найден`)
      }

      return product
    }

    if (categorySlug) {
      const category = await this.prisma.category.findUnique({
        where: { slug: categorySlug },
        include: {
          Products: {
            include: { category: true, subcategory: true },
          },
        },
      })

      if (!category) {
        throw new NotFoundException(
          `Категория с slug ${categorySlug} не найдена`,
        )
      }

      return category.Products
    }

    const where: Prisma.ProductWhereInput = {}

    if (bestseller !== undefined) {
      where.isBestseller = bestseller
    }

    // Фильтр по категории
    if (categoryId) {
      where.categoryId = categoryId
    }

    if (subcategoryId) {
      where.subcategoryId = subcategoryId
    }

    const products = await this.prisma.product.findMany({
      where,
      include: { category: true, subcategory: true },
    })

    if (products.length === 0) {
      throw new NotFoundException(`Продукты не найдены по указанным параметрам`)
    }

    return products
  }

  async updateProduct(id: number, data: UpdateProductDto) {
    const {
      name,
      price,
      description,
      images,
      stock,
      isBestseller,
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
        isBestseller,
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
