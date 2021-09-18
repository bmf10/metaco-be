import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import { TournamentResult } from 'models/tournamentResult'
import { col, FindAndCountOptions, fn, WhereOptions } from 'sequelize'

interface Params {
  readonly perPage?: number
  readonly page?: number
  readonly order?: 'id' | 'point'
  readonly sort?: 'ASC' | 'DESC' | 'asc' | 'desc'
  readonly tournamentId?: number
  readonly teamId?: number
}

interface Options {
  readonly rows: FindAndCountOptions
  readonly count: FindAndCountOptions
}

interface TotalResult {
  readonly total: number
}

const validationSchema: schema = {
  query: Joi.object<Params>({
    page: Joi.number().default(1),
    perPage: Joi.number().default(10),
    order: Joi.string().valid('id', 'point').default('point'),
    sort: Joi.string().valid('asc', 'desc', 'ASC', 'DESC').default('desc'),
    teamId: Joi.number(),
    tournamentId: Joi.number(),
  }),
}

const generateOptions = (params: Params): Options => {
  const { order, tournamentId, teamId, sort, page, perPage } = params
  let where: WhereOptions = {}

  if (tournamentId) {
    where = { ...where, tournamentId }
  }

  if (teamId) {
    where = { ...where, teamId }
  }

  const orderBy = order === 'point' ? col('totalPoint') : col(order!)

  return {
    rows: {
      attributes: [
        [fn('DISTINCT', col('teamId')), 'teamId'],
        [fn('SUM', col('point')), 'totalPoint'],
      ],
      include: [
        {
          association: 'team',
          attributes: ['id', 'name'],
        },
      ],
      limit: perPage,
      offset: (page! - 1) * perPage!,
      group: [col('teamId')],
      where,
      order: [[orderBy, sort!]],
    },
    count: {
      attributes: [[fn('COUNT', fn('DISTINCT', col('teamId'))), 'total']],
      where,
    },
  }
}

const requestHandler: RequestHandler = async (req, res) => {
  const { page, perPage } = req.query as Params

  const options = generateOptions(req.query)

  const rows = await TournamentResult.findAll(options.rows)
  const total = await TournamentResult.findOne(options.count)

  res.json({
    perPage,
    page,
    total: (total?.toJSON() as TotalResult).total,
    data: rows.map((r) => r.toJSON()),
  })
}

const router = Router()

router.get(
  '/leaderboard',
  validate(validationSchema, { context: true }),
  requestHandler
)

export default router
