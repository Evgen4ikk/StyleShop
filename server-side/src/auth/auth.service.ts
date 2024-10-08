import { Injectable } from '@nestjs/common'
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions'
import { JwtService } from '@nestjs/jwt/dist'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { AuthDto, RegisterDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  async getNewTokens(refreshToken: string) {
    try {
      const result = await this.jwt.verifyAsync(refreshToken)

      if (!result) {
        return {
          message: 'Invalid refresh token',
        }
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: result.id,
        },
      })

      const tokens = await this.issueTokens(user.id)

      return {
        ...tokens,
      }
    } catch (error) {
      return {
        message: 'Invalid refresh token',
      }
    }
  }

  async register(dto: RegisterDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (oldUser) throw new BadRequestException('Пользователь существует')

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: await hash(dto.password),
      },
    })

    const tokens = await this.issueTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens,
    }
  }

  private async issueTokens(userId: number) {
    const data = { id: userId }

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    })

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    })

    return { accessToken, refreshToken }
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    })

    if (!user) throw new NotFoundException('Полььзователь не найден')

    const isValid = await verify(user.password, dto.password)

    if (!isValid) throw new UnauthorizedException('Неверный пароль')

    return user
  }
}
