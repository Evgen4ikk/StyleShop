import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(data: Prisma.CategoryCreateInput) {
    if (!data.name) {
      throw new BadRequestException('Имя категории не может быть пустым')
    }

    const existingCategory = await this.prisma.category.findUnique({
      where: { name: data.name },
    })
    if (existingCategory) {
      throw new ConflictException('Категория с таким именем уже существует')
    }

    return this.prisma.category.create({ data })
  }

  async getCategories() {
    return this.prisma.category.findMany({
      include: { Subcategories: true },
    })
  }

  async getCategoryById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { Subcategories: true },
    })

    if (!category) {
      throw new NotFoundException(`Категория с ID ${id} не найдена`)
    }

    return category
  }

  async updateCategory(id: number, data: Prisma.CategoryUpdateInput) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    })

    if (!existingCategory) {
      throw new NotFoundException(`Категория с ID ${id} не найдена`)
    }

    let nameToCheck: string | undefined

    if (typeof data.name === 'string') {
      nameToCheck = data.name
    } else if (data.name && 'set' in data.name) {
      nameToCheck = data.name.set
    }

    if (nameToCheck) {
      const duplicateCategory = await this.prisma.category.findUnique({
        where: { name: nameToCheck },
      })

      if (duplicateCategory && duplicateCategory.id !== id) {
        throw new ConflictException('Категория с таким именем уже существует')
      }
    }

    return this.prisma.category.update({
      where: { id },
      data,
    })
  }

  async deleteCategory(id: number) {
    await this.prisma.subcategory.deleteMany({
      where: { categoryId: id },
    })

    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    })

    if (!existingCategory) {
      throw new NotFoundException(`Категория с ID ${id} не найдена`)
    }

    return this.prisma.category.delete({
      where: { id },
    })
  }
}
