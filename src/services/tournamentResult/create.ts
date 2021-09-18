import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import db from 'models'
import { TeamMember } from 'models/teamMember'
import { TournamentResult } from 'models/tournamentResult'
import { User } from 'models/user'
import generateAward from 'utils/generateAward'

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

const requestHandler: RequestHandler = async (req, res, next) => {
  const body = req.body as Params
  const transaction = await db.sequelize.transaction()
  const award = generateAward(body.position)
  try {
    const tournament = await TournamentResult.create(
      {
        ...body,
        point: award,
      },
      { transaction }
    )

    const teamMember = await TeamMember.findAll({
      attributes: ['id', 'userId'],
      where: { teamId: body.teamId },
      include: [
        {
          association: 'user',
        },
      ],
      transaction,
    })

    await Promise.all(
      teamMember.map(({ user }) => {
        return User.update(
          { coin: user.coin + award },
          { where: { id: user.id }, transaction }
        )
      })
    )

    await transaction.commit()
    res.json(tournament.toJSON())
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

const router = Router()

router.post('/', validate(validationSchema, { context: true }), requestHandler)

export default router
