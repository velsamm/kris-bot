const express = require('express')
const app = express()
const debug = require('debug')('app:debug')
require('dotenv').config()

if (!process.env.RECEIVERS) {
    throw new Error('Environment variable RECEIVERS required!')
}

debug('App receivers: ', process.env.RECEIVERS)

const bot = require('./bot')

process.once('SIGINT', () => {
    try {
        bot.stop('SIGINT')
    } catch (e) {
        debug(e)
    }
})
process.once('SIGTERM', () => {
    try {
        bot.stop('SIGTERM')
    } catch (e) {
        debug(e)
    }
})

app.use(express.json())

app.post('/send', (req, res) => {
    const payload = req.body
    const name = `Имя: ${payload.name || ''}`
    const phone = `Телефон: ${payload.phone || ''}`
    const email = `Email: ${payload.email || ''}`
    const issue = `Сообщение: ${payload.issue || ''}`
    const source = `Откуда: ${payload.source || ''}`

    const tgMessage = `
Новая заявка!
    
${name}
${phone}
${email}
${issue}
${source}`

    const receivers = (process.env.RECEIVERS).split(',')
    bot.sendNotification(receivers, tgMessage)
        .then(() => {
            res.send()
        })
        .catch((e) => {
            debug(e)
            res.status(500).send()
        })

    return
})

app.listen(9000)
