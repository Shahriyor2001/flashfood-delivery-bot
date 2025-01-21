import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './user.schema';

@Module({
  imports : [ MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),],
  controllers: [],
  providers: [FoodService],
})
export class FoodModule {}
