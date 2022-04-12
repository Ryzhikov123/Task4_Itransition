const {Schema, model, Types} = require('mongoose')

const {OFFLINE} = require('../constants')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    dateRegister: {type: Date, required: true},
    dateLastAuthorization: {type: Date},
    status: {type: String, default: OFFLINE},
    notes: [{type: Types.ObjectId, ref: 'Note'}]
})

module.exports = model('User', schema)
