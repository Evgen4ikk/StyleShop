import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { updateUserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async byId(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  async updateProfile(id: number, dto: updateUserDto) {
    let isSameUser = null

    if (dto.email) {
      isSameUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      })

      if (isSameUser && id !== isSameUser.id) {
        throw new BadRequestException('Почта занята')
      }
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        password: true,
        name: true,
      },
    })

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email ? dto.email : user.email,
        name: dto.name ? dto.name : user.name,
        password: dto.password ? await hash(dto.password) : user.password,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }
}
