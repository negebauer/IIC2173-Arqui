const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Product = new Schema({
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
})

const model = "category"
const CategorySchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    products: [Product],
    context: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

CategorySchema.methods = {}

module.exports = mongoose.model(model, CategorySchema)
