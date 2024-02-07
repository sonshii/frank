import { Telegraf } from 'telegraf';

/**
 * Настройки
 * @type token: string - Токен бота
 * @type admin: number - id владельца бота
 */
let config = {
  "token": "",
  "admin": 0,
  "boba": 0,
};


const bot = new Telegraf('');

/**
 * Проверяем пользователя на права
 * @param userId {number}
 * @returns {boolean}
 */
let isAdmin = (userId) => {
  return userId == config.admin;
};

// кнопки меню
const menu = () => {
  return {
    reply_markup: {
      inline_keyboard: [
        [{text: 'Да', callback_data: 'yes'}, {text: 'Нет', callback_data: 'no'}]
      ]
    }
  }
};

bot.start(async(ctx) => {
  await ctx.reply('Ты участвуешь?', menu());
  // await console.log('ctx', ctx);
  // if (isAdmin(ctx.message.from.id)) {
  //   ctx.reply('Шо надо?')
  // } else {
  //   await ctx.reply('Ты участвуешь?', menu());
  // }
});

bot.action('yes', (ctx) => {
  ctx.deleteMessage();
  ctx.telegram.sendMessage(config.boba, `${ctx.update.callback_query.from.username} нажал да`)
  return ctx.reply('Вы нажали да!')
})

bot.action('no', (ctx) => {
  ctx.deleteMessage();
  ctx.telegram.sendMessage(config.boba, `${ctx.update.callback_query.from.username} нажал нет`)
  return ctx.reply('Вы нажали нет!')
})

bot.on('message', async (ctx) => {
  await console.log('ctx.message.from.id', ctx.message.from.id);
  await ctx.reply(ctx.message);
})


// const member = bot.telegram.getChatMember();
// console.log('member', member);
// bot.telegram.sendMessage(-1002089738139, 'Хаю хай');
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));