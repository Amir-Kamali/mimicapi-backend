import Joi from 'joi'
import { Request, Response } from 'express'

const validateProject = (req: Request, res: Response, next: Function) => {
  const schema = Joi.object({
    title: Joi.string().alphanum().required(),
    isEnabled: Joi.boolean().required(),
    members: Joi.array()
  }).unknown(true)

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  next()
}

export default validateProject