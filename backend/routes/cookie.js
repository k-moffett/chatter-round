const crypto = require('crypto')

const nonce = () => {
        let text = ''
        let selection = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	    for (i=0; i<20; i++) {
                text += selection.charAt(Math.floor(Math.random()*selection.length))
            }
        return text
    }

const cookie = () => {
	return crypto.createHash('sha256').update(`${nonce()+Date.now()}`).digest('hex')
    }
    
module.exports = cookie;