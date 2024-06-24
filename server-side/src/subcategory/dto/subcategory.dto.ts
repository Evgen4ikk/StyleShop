import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsString()
  image?: string

  @IsInt()
  @IsNotEmpty()
  categoryId: number
}

export class UpdateSubcategoryDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Имя подкатегории не может быть пустым' })
  @IsString({ message: 'Имя подкатегории должно быть строкой' })
  name?: string

  @IsOptional()
  @IsString()
  image?: string

  @IsInt()
  @IsOptional()
  categoryId?: number
}
