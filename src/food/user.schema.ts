import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Users {
  @Prop()
  chatId: number;

  @Prop()
  firstName: string;

  @Prop()
  phoneNumber: string;

  // Change location to be an object with latitude and longitude
  @Prop({
    type: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    required: true,
  })
  location: { latitude: number; longitude: number };

  @Prop([Object])
  orders: { productName: string; price: number; quantity: number }[];
}

export type UsersDocument = Users & Document;
export const UsersSchema = SchemaFactory.createForClass(Users);
