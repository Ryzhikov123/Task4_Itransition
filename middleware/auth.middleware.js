const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')
const {BLOCKED} = require('../constants')

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: 'No authorization.' })
        }

        const user = jwt.verify(token, config.get('jwtSecret'))
        const exists = await User.findOne({_id: user.userId})
        if (exists && exists.status !== BLOCKED) {
            req.user = user
        } else {
            throw new Error('User is blocked.')
        }

        next()
    } catch (e) {
        res.status(401).json({ message: 'No authorization.' })
    }
}
