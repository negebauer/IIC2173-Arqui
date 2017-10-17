const mongoose = require('mongoose')
const Schema = mongoose.Schema

const model = 'order'
const OrderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  sentAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
})

OrderSchema.methods = {}

module.exports = mongoose.model(model, OrderSchema)
