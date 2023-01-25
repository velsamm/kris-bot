const express = require('express')
const app = express()
const debug = require('debug')('app:debug')
require('dotenv').config()

if (!process.env.RECEIVERS) {
    throw new Error('Environment variable RECEIVERS required!')
}

debug('App receivers: ', process.env.RECEIVERS)

const notify = require('./notificator')

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
    receivers.forEach(receiver => {
        notify(receiver, tgMessage)
    })

    return res.send()
})

app.listen(9000)
