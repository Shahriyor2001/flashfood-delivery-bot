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
        `Salom ${name}, bu botdan foydalanish uchun iltimos telefon raqamingizni jonating.`,
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
            `Rahmat! Telefon raqamingiz qabul qilindi: ${userPhone}`,
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
            'Rahmat! Sizning manzilingiz qabul qilindi.',
          );

          this.bot.sendMessage(
            chatId,
            'Endi iltimos, qanday mahsulot kategoriyasini tanlashingizni belgilab bering:',
            {
              reply_markup: {
                keyboard: [
                  [{ text: 'Ichimliklar' }],
                  [{ text: 'Yeguliklar' }],
                  [{ text: 'Shirinliklar' }],
                ],
                one_time_keyboard: true,
                resize_keyboard: true,
                selective: true,
              },
            },
          );

          // YEGULIKLAR
          this.bot.onText(/Yeguliklar/, (msg) => {
            const chatId = msg.chat.id;

            this.bot.sendPhoto(
              chatId,
              'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/master/pass/the-ultimate-hamburger.jpg',
              {
                caption:
                  "Ultimate Hamburger - Mazali burger tayyorlash uchun ideal tanlov! Narxi: 20000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_burger_20000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://www.healthyseasonalrecipes.com/wp-content/uploads/2022/09/mediterranean-lavash-wraps-055.jpg',
              {
                caption:
                  "Mediterranean Lavash Wrap - Sog'lom va mazali lavash! Narxi: 30000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_lavash_30000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://img.freepik.com/free-photo/classic-hot-dog-with-ketchup-mustard-sauce-isolated-white-background_123827-29747.jpg?semt=ais_incoming',
              {
                caption:
                  "Classic Hot Dog - An'anaviy issiq it. Narxi: 15000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_hotdog_15000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU=',
              {
                caption:
                  "Cheesy Pepperoni Pizza - Pitsa, yengil va mazali taom! Narxi: 25000 so'm",
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

          // ICHIMLIKLAR
          this.bot.onText(/Ichimliklar/, (msg) => {
            const chatId = msg.chat.id;

            this.bot.sendPhoto(
              chatId,
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3M-xR4PTf-oldWP8s2UWBCDxtZatNqXs1NA&s',
              {
                caption:
                  "Cola - Klassik va mazali cola ichimligi! Narxi: 15000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_cola_15000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://t3.ftcdn.net/jpg/03/23/86/24/360_F_323862457_5RaEzJNg6yeYx6RjbU4WwkAl3R0yxNQt.jpg',
              {
                caption: "Pepsi - Yengil va sodda lazzat! Narxi: 13000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_pepsi_13000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://target.scene7.com/is/image/Target/GUEST_bdd6ab3c-67f1-434e-ac78-1b4baa6f7298?wid=488&hei=488&fmt=pjpeg',
              {
                caption:
                  "Fanta - Rang-barang va xushbo'y taomlar bilan! Narxi: 12000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_fanta_12000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuwfyPonH0cPvqO_SELhyYHAZUmRYluj5n2w&s',
              {
                caption:
                  "Sprite - Sovuq va xushbo’y limonli ichimlik! Narxi: 11000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_sprite_11000',
                      },
                    ],
                  ],
                },
              },
            );
          });

          // SHIRINLIKLAR
          this.bot.onText(/Shirinliklar/, (msg) => {
            const chatId = msg.chat.id;

            this.bot.sendPhoto(
              chatId,
              'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQrPOBTd5Hi2OFTsgWc_SNC1VqcmmEFerI0qrTFvczOA-REun7da_2KHSLIG0vXXEVCrrQylViK3OcRZhESu8dKFCVGq0qvRgxjX5JmDQ',
              {
                caption:
                  "Chocolate Cake - Shokoladli tort, shirinliklar sevuvchilar uchun ajoyib tanlov! Narxi: 25000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_chocolate_cake_25000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT0HaBeYP9r42F9vmLuH49OyZ0Ry1v1_M2uk4pLF-6fZzkeTJQfjLyj-JPyHZ9nkLfPzBY5MmmdRxx1yrh_ZIPgjN8h3xTf7ggjve69AQ',
              {
                caption:
                  "Strawberry Cupcakes - Yangi qulupnay bilan bezatilgan mazali keks! Narxi: 18000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_strawberry_cupcake_18000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqRxk5kyM1etMVpLHgnJK02Cd-9I_NlQxzNg&s',
              {
                caption:
                  "Ice Cream Sundae - Muzqaymoq va mevali shirinlik! Narxi: 22000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_ice_cream_22000',
                      },
                    ],
                  ],
                },
              },
            );

            this.bot.sendPhoto(
              chatId,
              'https://www.tfcakes.in/images/products/230202_121111_214_057.jpg',
              {
                caption:
                  "Fruit Tart - Mevalar bilan to'ldirilgan mazali shirinlik! Narxi: 20000 so'm",
                reply_markup: {
                  inline_keyboard: [
                    [
                      {
                        text: 'Buyurtma berish',
                        callback_data: 'order_fruit_tart_20000',
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
              `${productName} buyurtma qilindi! Narxi: ${price} so\'m`,
            );
            this.bot.sendMessage(chatId, 'Buyurtmangiz qabul qilindi.');
          });
        }
      });
    });
  }
}
