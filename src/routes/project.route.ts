import { Router } from 'express'
import validateProject from '../middleware/validators/project.validator'
import { createProject, deleteProject, generateToken, getProjects, updateProject } from '../controller/project.controller'

const routes = Router()

routes.get('/', getProjects)

routes.post('/', validateProject, createProject)

routes.put('/:id', validateProject, updateProject)

routes.delete('/:id', deleteProject)

routes.get('/:id', generateToken)

export default routes
