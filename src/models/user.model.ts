import { model, Schema, Document } from 'mongoose'

interface IUser extends Document {
  name: string
  picture: string
}
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
})

const UserModel = model<IUser>('User', UserSchema)

export { UserModel, IUser }
