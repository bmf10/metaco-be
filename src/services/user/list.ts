import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import { User } from 'models/user'
import { Op } from 'sequelize'

interface Params {
  readonly perPage?: number
  readonly page?: number
  readonly search?: string
  readonly order?: 'id' | 'coin'
  readonly sort?: 'ASC' | 'DESC' | 'asc' | 'desc'
}

const validationSchema: schema = {
  query: Joi.object<Params>({
    page: Joi.number().default(1),
    perPage: Joi.number().default(10),
    search: Joi.string().optional(),
    order: Joi.string().valid('id', 'coin').default('coin'),
    sort: Joi.string().valid('asc', 'desc', 'ASC', 'DESC').default('desc'),
  }),
}

const requestHandler: RequestHandler = async (req, res) => {
  const { page, perPage, search, sort, order }: Params = req.query
  const { rows, count } = await User.findAndCountAll({
    limit: perPage,
    offset: (page! - 1) * perPage!,
    order: [[order!, sort!]],
    ...(search ? { where: { name: { [Op.like]: `%${search}%` } } } : undefined),
  })

  res.json({ perPage, page, total: count, data: rows.map((r) => r.toJSON()) })
}

const router = Router()

router.get('/', validate(validationSchema, { context: true }), requestHandler)

export default router
