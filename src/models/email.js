import mongoose from 'mongoose'

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 60,
  },
  body: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 2000,
  },
  dateSent: {
    type: Date,
    required: true
  }
})


emailSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Email = mongoose.model('Email', emailSchema)

export default Email