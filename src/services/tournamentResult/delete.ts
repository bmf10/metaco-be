import { RequestHandler, Router } from 'express'
import db from 'models'
import { TeamMember } from 'models/teamMember'
import { TournamentResult } from 'models/tournamentResult'
import { User } from 'models/user'
import generateAward from 'utils/generateAward'

const requestHandler: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  const transaction = await db.sequelize.transaction()
  try {
    const tournament = await TournamentResult.findByPk(id, {
      transaction,
    })

    if (!tournament) {
      return res.sendStatus(404)
    }

    const award = generateAward(tournament.position)

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

    await Promise.all(
      teamMember.map(({ user }) => {
        return User.update(
          { coin: user.coin - award },
          { where: { id: user.id }, transaction }
        )
      })
    )

    await tournament.destroy({ transaction })

    await transaction.commit()
    res.json(tournament.toJSON())
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

const router = Router()

router.delete('/:id', requestHandler)

export default router
