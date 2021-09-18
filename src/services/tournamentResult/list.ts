import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import { TournamentResult } from 'models/tournamentResult'

interface Params {
  readonly perPage?: number
  readonly page?: number
  readonly tournamentId?: number
}

const validationSchema: schema = {
  query: Joi.object<Params>({
    page: Joi.number().default(1),
    perPage: Joi.number().default(10),
    tournamentId: Joi.number(),
  }),
}

const requestHandler: RequestHandler = async (req, res) => {
  const { page, perPage, tournamentId }: Params = req.query
  const { rows, count } = await TournamentResult.findAndCountAll({
    ...(tournamentId ? { where: { tournamentId } } : undefined),
    limit: perPage,
    offset: (page! - 1) * perPage!,
    include: [
      {
        association: 'team',
        attributes: ['id', 'name', 'logo'],
      },
    ],
  })

  res.json({ perPage, page, total: count, data: rows.map((r) => r.toJSON()) })
}

const router = Router()

router.get('/', validate(validationSchema, { context: true }), requestHandler)

export default router
