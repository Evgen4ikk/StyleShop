import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Имя категории не может быть пустым' })
  @IsString({ message: 'Имя категории должно быть строкой' })
  name?: string
}
