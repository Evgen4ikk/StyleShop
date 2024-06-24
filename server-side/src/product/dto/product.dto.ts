import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty({ message: 'Имя продукта не может быть пустым' })
  @IsString({ message: 'Имя продукта должно быть строкой' })
  name: string

  @IsNotEmpty({ message: 'Цена продукта не может быть пустой' })
  @IsNumber({}, { message: 'Цена продукта должна быть числом' })
  @Min(0, { message: 'Цена продукта должна быть больше или равна нулю' })
  price: number

  @IsOptional()
  @IsString({ message: 'Описание продукта должно быть строкой' })
  description?: string

  @IsOptional()
  @IsString({ message: 'Массив URL изображений должен быть массивом строк' })
  images?: string[]

  @IsNotEmpty({ message: 'Количество на складе не может быть пустым' })
  @IsNumber({}, { message: 'Количество на складе должно быть числом' })
  @Min(0, { message: 'Количество на складе должно быть больше или равно нулю' })
  stock: number

  @IsNotEmpty({ message: 'ID категории не может быть пустым' })
  @IsNumber({}, { message: 'ID категории должен быть числом' })
  categoryId: number

  @IsNotEmpty({ message: 'ID подкатегории не может быть пустым' })
  @IsNumber({}, { message: 'ID подкатегории должен быть числом' })
  subcategoryId: number
}

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Имя продукта должно быть строкой' })
  name?: string

  @IsOptional()
  @IsNumber({}, { message: 'Цена продукта должна быть числом' })
  @Min(0, { message: 'Цена продукта должна быть больше или равна нулю' })
  price?: number

  @IsOptional()
  @IsString({ message: 'Описание продукта должно быть строкой' })
  description?: string

  @IsOptional()
  @IsString({ message: 'Массив URL изображений должен быть массивом строк' })
  images?: string[]

  @IsOptional()
  @IsNumber({}, { message: 'Количество на складе должно быть числом' })
  @Min(0, { message: 'Количество на складе должно быть больше или равно нулю' })
  stock?: number

  @IsOptional()
  @IsNumber({}, { message: 'ID категории должен быть числом' })
  categoryId?: number

  @IsOptional()
  @IsNumber({}, { message: 'ID подкатегории должен быть числом' })
  subcategoryId?: number
}
