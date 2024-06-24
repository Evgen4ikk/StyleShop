import { IsEmail, IsOptional, IsString } from 'class-validator'

export class userDto {
  @IsEmail()
  email: string

  @IsString()
  @IsOptional()
  password: string

  @IsString()
  @IsOptional()
  name: string
}

export class updateUserDto {
  @IsEmail({}, { message: 'Некорректная почта' })
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  password?: string
}
