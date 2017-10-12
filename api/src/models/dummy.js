const mongoose = require('mongoose')
const Schema = mongoose.Schema

const model = 'dummy'
const schema = new Schema({
  date: Date,
})

schema.methods = {}

module.exports = mongoose.model(model, schema)
