import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as TelegramBot from 'node-telegram-bot-api';
import { Users, UsersDocument } from './user.schema';

@Injectable()
export class FoodService {
  private bot: TelegramBot;

  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
  ) {
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_API, { polling: true });

    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const name = msg.chat.first_name;

      let userPhone = '';
      let userLocation = [];

      this.bot.sendMessage(
        chatId,
        `Salom ${name}, bu botdan foydalanish uchun telefon raqamingizni jonatishingiz kerak.`,
        {
          reply_markup: {
            keyboard: [
              [
                { text: '📱 Telefon raqamini yuborish', request_contact: true },
                { text: " Manzilni jo'natish", request_location: true },
              ],
            ],
            one_time_keyboard: true,
            resize_keyboard: true,
            selective: true,
          },
        },
      );

      this.bot.on('contact', (msg) => {
        const contact = msg.contact;
        userPhone = contact.phone_number;

        if (contact) {
          this.bot.sendMessage(
            chatId,
            ` Telefon raqamingiz qabul qilindi: ${userPhone}`,
          );
          this.bot.sendMessage(chatId, "Iltimos endi manzilingizni jo'nating");
        }
      });

      this.bot.on('location', (msg) => {
        const location = msg.location;
        if (location) {
          userLocation = [location.latitude, location.longitude];
          this.bot.sendMessage(
            chatId,
            'Manzilingiz qabul qilindi.',
          );

          this.bot.sendMessage(
            chatId,
            ' Quyidagi mahsulot kategoriyalaridan birini tanlang:',
            {
              reply_markup: {
                keyboard: [
                  [{ text: 'Ichimliklar' }],
                  [{ text: 'Taomlar' }],
                  [{ text: 'Shirinliklar' }],
                ],
                one_time_keyboard: true,
                resize_keyboard: true,
                selective: true,
              },
            },
          );

          
          this.bot.onText(/Taomlar/, (msg) => {
            const chatId = msg.chat.id;

            this.bot.sendPhoto(
              chatId,
              'https://t3.ftcdn.net/jpg/08/90/37/24/360_F_890372475_jGMWf3dUYjw2Ab3rjZQYPF0PJyYgIjN3.webp',
              {
                caption:
                  "Pishloqli burger -  Narxi: 25000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_burger_25000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://e7.pngegg.com/pngimages/24/47/png-clipart-bbq-on-white-plate-shish-kebab-doner-kebab-turkish-cuisine-bresaola-kebab-barbecue-food-thumbnail.png',
              {
                caption:
                  "Turkcha Kabob - Narxi: 35000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_kabab_35000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://mojo.generalmills.com/api/public/content/GmHhoT5mr0Sue2oMxdyEig_webp_base.webp?v=868009f1&t=191ddcab8d1c415fa10fa00a14351227',
              {
                caption:
                  "Meksikacha Taco -  Narxi: 20000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_taco_20000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'hhttps://italianfoodforever.com/wp-content/uploads/2015/11/buratapizza-1.jpg',
              {
                caption:
                  "Motzarella Pishloqli Pitsasi - Narxi: 35000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_pizza_25000',
                      },
                    ],
                  ],
                },
              },
            );
          });

          
          this.bot.onText(/Ichimliklar/, (msg) => {
            const chatId = msg.chat.id;

            this.bot.sendPhoto(
              chatId,
              'https://purepng.com/public/uploads/large/purepng.com-coca-coladrinks-coca-cola-941524644291ozoln.png',
              {
                caption:
                  "Coca Cola - Narxi: 18000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_cola_18000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://purepng.com/public/uploads/large/pepsi-bottle-wet-ss3.png',
              {
                caption: "Pepsi - Narxi: 15000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_pepsi_15000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://pngimg.com/d/fanta_PNG46.png',
              {
                caption:
                  "Fanta - Narxi: 10000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_fanta_10000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://www.coca-cola.com/content/dam/onexp/gb/en/product/sprite-low-cal-02.png',
              {
                caption:
                  "Sprite - Narxi: 10000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_sprite_10000',
                      },
                    ],
                  ],
                },
              },
            );
          });

          
          this.bot.onText(/Shirinliklar/, (msg) => {
            const chatId = msg.chat.id;

            this.bot.sendPhoto(
              chatId,
              'https://img.freepik.com/free-psd/delicious-vanilla-cake-decorated-with-berries-isolated-transparent-background_191095-11774.jpg',
              {
                caption:
                  "Vanilla Cake - Narxi: 85000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_vanilla_cake_85000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://www.thespruceeats.com/thmb/uhagoJnNgKrzHARRkHqOrs0a2Cw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/buttery-pie-and-tart-crust-2215809-hero-011-f30fde9492bb4545b35305fa81981cb1.jpg',
              {
                caption:
                  "Olchali Pirog - Narxi: 48000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_cherry_pie_48000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://aplantifulpath.com/wp-content/uploads/2019/08/Strawberry-Ice-Cream-1.jpg',
              {
                caption:
                  "Qulupnayli Muzqaymoq - Narxi: 32000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_ice_cream_32000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://www.elleandpear.com/wp-content/uploads/2024/09/Maple-Chocolate-Walnut-Pie-13.jpg',
              {
                caption:
                  "Shokolad va Yong'oqli Pirog - Narxi: 60000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_Chocolate_pie_60000',
                      },
                    ],
                  ],
                },
              },
            );
          });

          this.bot.on('callback_query', async (query) => {
            const chatId = query.message.chat.id;
            const productData = query.data.split('_');
            const productName = productData[1];
            const price = parseInt(productData[2]);

            let user = await this.userModel.findOne({ chatId });

            if (!user) {
              user = new this.userModel({
                chatId,
                firstName: msg.chat.first_name,
                phoneNumber: userPhone,
                location: userLocation,
                orders: [],
              });
            }

            user.orders.push({ productName, price, quantity: 1 });

            await userModel.create(user);

            this.bot.sendMessage(
              chatId,
              `${productName} buyurtma qilindi! Narxi: ${price} so'm`,
            );
            this.bot.sendMessage(chatId, 'Buyurtmangiz qabul qilindi.');
          });
        }
      });
    });
  }
}
