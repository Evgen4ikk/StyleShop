import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import {
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from './dto/subcategory.dto'

@Injectable()
export class SubcategoryService {
  constructor(private prisma: PrismaService) {}

  async createSubcategory(dto: CreateSubcategoryDto) {
    if (!dto.name) {
      throw new BadRequestException('Имя не может быть пустым')
    }

    const existingSubcategory = await this.prisma.subcategory.findUnique({
      where: { name: dto.name },
    })
    if (existingSubcategory) {
      throw new ConflictException('Подкатегория с таким именем уже существует')
    }

    // Проверка, существует ли категория с указанным ID
    const existingCategory = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    })
    if (!existingCategory) {
      throw new NotFoundException(`Категория с ID ${dto.categoryId} не найдена`)
    }

    return this.prisma.subcategory.create({
      data: {
        name: dto.name,
        category: { connect: { id: dto.categoryId } },
      },
    })
  }

  async getSubcategories() {
    return this.prisma.subcategory.findMany({
      include: { Products: true },
    })
  }

  async getSubcategoryById(id: number) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: { id },
      include: { Products: true },
    })

    if (!subcategory) {
      throw new NotFoundException(`Подкатегория с ID ${id} не найдена`)
    }

    return subcategory
  }

  async updateSubcategory(id: number, dto: UpdateSubcategoryDto) {
    if (!dto.name) {
      throw new BadRequestException('Name is required')
    }

    const existingSubcategory = await this.prisma.subcategory.findUnique({
      where: { id },
    })

    if (!existingSubcategory) {
      throw new NotFoundException(`Подкатегория с ID ${id} не найдена`)
    }

    const duplicateSubcategory = await this.prisma.subcategory.findUnique({
      where: { name: dto.name },
    })
    if (duplicateSubcategory && duplicateSubcategory.id !== id) {
      throw new ConflictException('Подкатегория с таким именем уже существует')
    }

    if (dto.categoryId) {
      const existingCategory = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      })
      if (!existingCategory) {
        throw new NotFoundException(
          `Категория с ID ${dto.categoryId} не найдена`,
        )
      }
    }

    return this.prisma.subcategory.update({
      where: { id },
      data: {
        name: dto.name,
        category: dto.categoryId
          ? { connect: { id: dto.categoryId } }
          : undefined,
      },
    })
  }

  async deleteSubcategory(id: number) {
    const existingSubcategory = await this.prisma.subcategory.findUnique({
      where: { id },
    })

    if (!existingSubcategory) {
      throw new NotFoundException(`Подкатегория с ID ${id} не найдена`)
    }

    await this.prisma.product.deleteMany({
      where: { subcategoryId: id },
    })

    return this.prisma.subcategory.delete({
      where: { id },
    })
  }
}
