import { Schema } from 'mongoose'

let serverScheme = Schema({
  _id: String,
  prefix: String
})

export { serverScheme }
