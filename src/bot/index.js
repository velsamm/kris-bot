const { Telegraf } = require('telegraf')

class Bot {
    constructor() {
        if (this.bot) {
            return this
        }
        this.build()
        this.launch()
        return this
    }

    build() {
        this.bot = new Telegraf(process.env.BOT_TOKEN)
    }

    launch() {
        this.bot.launch().then(() => {
            this.engine()
        })
    }

    stop(reason) {
        this.bot.stop(reason)
        return this
    }

    engine() {
        this.bot.start((ctx) => {
            ctx.reply('hi')
        })
    }

    async sendNotification(receivers, message) {
        return await Promise.all(
            receivers.map(receiver => this.bot.telegram.sendMessage(receiver, message))
        )
    }
}

module.exports = new Bot()
