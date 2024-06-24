import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import {
  CreateSubcategoryDto,
  UpdateSubcategoryDto,
} from './dto/subcategory.dto'
import { SubcategoryService } from './subcategory.service'

@Controller('subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post()
  @Auth()
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.subcategoryService.createSubcategory(createSubcategoryDto)
  }

  @Get()
  findAll() {
    return this.subcategoryService.getSubcategories()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoryService.getSubcategoryById(+id)
  }

  @Put(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: UpdateSubcategoryDto,
  ) {
    return this.subcategoryService.updateSubcategory(+id, updateSubcategoryDto)
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.subcategoryService.deleteSubcategory(+id)
  }
}
