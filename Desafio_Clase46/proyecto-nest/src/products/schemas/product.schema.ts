import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({required: true})
    title: string

    @Prop({required: true})
    price: number

    @Prop()
    description: string

    @Prop({required: true})
    stock: number

    //@Prop()
    //thumbnail: string
}

export const ProductSchema = SchemaFactory.createForClass(Product);