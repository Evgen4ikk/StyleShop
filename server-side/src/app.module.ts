import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { CategoryModule } from './category/category.module'
import { PrismaService } from './prisma.service'
import { ProductModule } from './product/product.module'
import { SubcategoryModule } from './subcategory/subcategory.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoryModule,
    SubcategoryModule,
    ProductModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
