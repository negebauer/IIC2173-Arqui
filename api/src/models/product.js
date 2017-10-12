const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const model = 'product'

ProductSchema.methods = {}

module.exports = mongoose.model(model, ProductSchema)
