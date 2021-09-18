import { RequestHandler, Router } from 'express'
import { Joi, schema, validate } from 'express-validation'
import db from 'models'
import { TeamMember } from 'models/teamMember'
import { TournamentResult } from 'models/tournamentResult'
import { User } from 'models/user'
import generateAward from 'utils/generateAward'

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

const requestHandler: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  const body = req.body as Params
  const transaction = await db.sequelize.transaction()

  try {
    const tournament = await TournamentResult.findByPk(id, { transaction })

    if (!tournament) {
      return res.sendStatus(404)
    }

    if (body.position) {
      const teamMember = await TeamMember.findAll({
        attributes: ['id', 'userId'],
        where: { teamId: tournament.teamId },
        include: [
          {
            association: 'user',
          },
        ],
        transaction,
      })

      const oldAward = generateAward(tournament.position)
      const newAward = generateAward(body.position)

      await Promise.all(
        teamMember.map(({ user }) =>
          User.update(
            { coin: user.coin - oldAward + newAward },
            { where: { id: user.id }, transaction }
          )
        )
      )
    }

    await tournament
      .set({
        ...body,
        ...(body.position ? { point: generateAward(body.position) } : {}),
      })
      .save({ transaction })

    await transaction.commit()
    res.json(tournament.toJSON())
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

const router = Router()

router.patch(
  '/:id',
  validate(validationSchema, { context: true }),
  requestHandler
)

export default router
