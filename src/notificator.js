const https = require('https')

/**
 *
 * @param {number} receiver
 * @param {string} message
 */

function notify(receiver, message) {
    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/bot${process.env.BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const req = https.request(options, (res) => {
        console.log(new Date().toISOString() + ' Request status code:', res.statusCode)
    })

    req.on('error', (e) => {
        console.error(new Date().toISOString() + ' ' + e)
    })

    req.write(JSON.stringify({ chat_id: receiver, text: message }))
    req.end()
}

module.exports = notify
