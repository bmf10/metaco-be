import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import { Team } from 'models/team'
import { Op } from 'sequelize'

interface Params {
  readonly perPage?: number
  readonly page?: number
  readonly search?: string
}

const validationSchema: schema = {
  query: Joi.object<Params>({
    page: Joi.number().default(1),
    perPage: Joi.number().default(10),
    search: Joi.string().optional(),
  }),
}

const requestHandler: RequestHandler = async (req, res) => {
  const { page, perPage, search }: Params = req.query
  const { rows, count } = await Team.findAndCountAll({
    limit: perPage,
    offset: (page! - 1) * perPage!,
    ...(search ? { where: { name: { [Op.like]: `%${search}%` } } } : undefined),
  })

  res.json({ perPage, page, total: count, data: rows.map((r) => r.toJSON()) })
}

const router = Router()

router.get('/', validate(validationSchema, { context: true }), requestHandler)

export default router
