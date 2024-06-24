import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsEmail({}, { message: 'Некорректная почта' })
  email: string

  @MinLength(6, {
    message: 'Пароль должен содержать не менее 6 символов',
  })
  @IsString()
  password: string
}

export class RegisterDto {
  @IsEmail({}, { message: 'Некорректная почта' })
  email: string

  @IsString()
  name: string

  @MinLength(6, {
    message: 'Пароль должен содержать не менее 6 символов',
  })
  @IsString()
  password: string
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string
}
