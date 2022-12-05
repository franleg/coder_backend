import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { Product, ProductSchema } from './schemas/product.schema';
import { ConfigModule } from '@nestjs/config/dist';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name,
      schema: ProductSchema
    }
  ]), ConfigModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
