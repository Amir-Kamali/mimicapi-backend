import { IProject, ProjectModel } from '../models/project.model'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projection = {
      _id: 1,
      isEnabled: 1,
      title: 1,
      members: 1,
    }
    const sort = [
      ['isEnabled', -1.0],
      ['title', 1.0],
    ]
    const projects = await ProjectModel.find().select(projection).sort(sort)
    return res.json(projects)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Sorry, something went wrong :/' })
  }
}

export const createProject = async (req: Request, res: Response) => {
  try {
    const project: IProject = req.body

    const projectExists = await ProjectModel.findOne({
      title: project.title,
    }).exec()

    if (projectExists) {
      return res.status(409).json({ error: 'There is already another Project with this name' })
    }

    const newProject = await ProjectModel.create(project)
    return res.status(201).json(newProject)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Sorry, something went wrong :/' })
  }
}

export const updateProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id
    const project: IProject = req.body

    const projectExists = await ProjectModel.findById(projectId).exec()

    if (!projectExists) {
      return res.status(404).json({ error: 'Project not found' })
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, { $set: project }, { new: true })

    return res.status(200).json(updatedProject)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Sorry, something went wrong :/' })
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id

    const projectExists = await ProjectModel.findById(projectId).exec()

    if (!projectExists) {
      return res.status(404).json({ error: 'Project not found' })
    }

    await ProjectModel.findByIdAndDelete(projectId).exec()

    return res.status(200).json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Sorry, something went wrong :/' })
  }
}

export const generateToken = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.id

    const projectExists = await ProjectModel.findById(projectId).exec()

    if (!projectExists) {
      return res.status(404).json({ error: 'Project not found' })
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, { $set: { token: uuidv4() } }, { new: true })

    if (updatedProject) return res.status(200).json(updatedProject.token)
    else return res.status(404).json({ error: 'Project not found' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Sorry, something went wrong :/' })
  }
}
