const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ValidationError = mongoose.Error.ValidationError
const ValidatorError = mongoose.Error.ValidatorError
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const isMail = function(email) {
  const re = /([\.-]?\w)+@([\.-]?\w)+\.(\w([\.-]\w)?)+$/ // eslint-disable-line no-useless-escape
  return re.test(email)
}

const isName = function(name) {
  const re = /^[A-ZÀÁÈÉÍÓÚÇÑ][a-zàáèéíóúçñ'-]+$/
  return re.test(name)
}

const isAddress = function(address) {
  const re = /^[A-ZÀÁÈÉÍÓÚÇÑa-zàáèéíóúçñ'-,. 0-9]+$/
  return re.test(address)
}

const model = 'user'
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is missing.'],
    validate: [isName, 'Please fill a valid first name.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is missing.'],
    validate: [isName, 'Please fill a valid last name.'],
  },
  mail: {
    type: String,
    required: [true, 'Email is missing.'],
    validate: [isMail, 'Please fill a valid email address.'],
    index: { unique: true },
  },
  address: {
    type: String,
    required: [true, 'Address is missing.'],
    validate: [isAddress, 'Please fill a valid address.'],
  },
  password: {
    type: String,
    required: [true, 'Password is missing.'],
    minlength: [4, 'Password is too short. At least 4 characters are needed.'],
    maxlength: [12, 'Password is too long. At most 12 characters are allowed.'],
  },
  token: {
    type: String,
  },
})

async function validateMailUnicity(user) {
  const otherUser = await mongoose.models['user'].findOne({ mail: user.mail })
  if (otherUser && otherUser._id != user._id) {
    const error = new ValidationError(this)
    error.errors.mail = new ValidatorError({
      type: 'unique',
      path: 'mail',
      message: 'Email already in use.',
      value: user.mail,
    })
    throw error
  }
}

// Mongoose middleware is not invoked on update() operations
// so use save() to update user passwords

async function buildPasswordHash(user) {
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR)
  }
}

UserSchema.pre('save', async function(next) {
  try {
    await validateMailUnicity(this)
  } catch (error) {
    return next(error)
  }
  await buildPasswordHash(this)
  return next()
})

UserSchema.methods = {
  comparePassword: function checkPassword(password) {
    return bcrypt.compare(password, this.password)
  },
}

module.exports = mongoose.model(model, UserSchema)
