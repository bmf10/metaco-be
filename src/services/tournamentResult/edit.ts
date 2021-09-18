import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import { TournamentResult } from 'models/tournamentResult'

interface Params {
  readonly teamId?: number
  readonly position?: number
  readonly tournamentId?: number
}

const validationSchema: schema = {
  body: Joi.object<Params>({
    teamId: Joi.number(),
    position: Joi.number(),
    tournamentId: Joi.number(),
  }),
}

const generatePoint = (position: number): number => {
  switch (position) {
    case 1:
      return 5
    case 2:
      return 3
    case 3:
      return 2
    default:
      return 0
  }
}

const requestHandler: RequestHandler = async (req, res) => {
  const { id } = req.params
  const body = req.body as Params

  const tournament = await TournamentResult.findByPk(id)

  if (!tournament) {
    return res.sendStatus(404)
  }

  await tournament
    .set({
      ...body,
      ...(body.position ? { point: generatePoint(body.position) } : {}),
    })
    .save()

  res.json(tournament.toJSON())
}

const router = Router()

router.patch(
  '/:id',
  validate(validationSchema, { context: true }),
  requestHandler
)

export default router
