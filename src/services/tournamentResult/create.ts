import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import { TournamentResult } from 'models/tournamentResult'

interface Params {
  readonly teamId: number
  readonly position: number
  readonly tournamentId: number
}

const validationSchema: schema = {
  body: Joi.object<Params>({
    teamId: Joi.number().required(),
    position: Joi.number().required(),
    tournamentId: Joi.number().required(),
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
  const body = req.body as Params
  const tournament = await TournamentResult.create({
    ...body,
    point: generatePoint(body.position),
  })

  res.json(tournament.toJSON())
}

const router = Router()

router.post('/', validate(validationSchema, { context: true }), requestHandler)

export default router
