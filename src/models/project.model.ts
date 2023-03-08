import { model, Schema, Document } from 'mongoose'
import { IUser } from './user.model'

interface IProject extends Document {
  title: string
  path: string
  token: string
  isEnabled: boolean
  members: IUser[]
}

const ProjectSchema = new Schema({
  title: String,
  path: String,
  token: String,
  isEnabled: Boolean,
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

const ProjectModel = model<IProject>('Project', ProjectSchema)

export { ProjectModel, IProject }
