const {Router} = require('express')

const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const {OFFLINE, BLOCKED} = require('../constants')

const router = Router()

router.get('/', auth, async (req, res) => {
    try {
        const users = await User.find()
        const usersForFront = users.map((user) => {
            return {
                id: user._id,
                email: user.email,
                name: user.name,
                status: user.status,
                dateRegister: user.dateRegister,
                dateLastAuthorization: user.dateLastAuthorization
            }
        })
        res.status(200).json(usersForFront)
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        await User.remove({_id: req.params.id})
        res.status(200).json({message: 'User has been deleted.'})
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/block/:id', auth, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {status: BLOCKED})
        res.status(200).json({message: 'User changed.'})
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.post('/unlock/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user.status === BLOCKED) {
            user.status = OFFLINE
            await user.save()
            res.status(200).json({message: 'User changed.'})
        } else {
            res.status(202).json({message: 'User is not blocked.'})
        }
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

router.get('/logout', auth, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.userId, {status: OFFLINE})
        res.status(200).json({message: 'User changed.'})
    } catch (e) {
        res.status(400).json({message: 'Something went wrong, try again.'})
    }
})

module.exports = router
