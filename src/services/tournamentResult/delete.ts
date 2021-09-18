import { RequestHandler, Router } from 'express'
import { TournamentResult } from 'models/tournamentResult'

const requestHandler: RequestHandler = async (req, res) => {
  const { id } = req.params

  const tournament = await TournamentResult.findByPk(id)

  if (!tournament) {
    return res.sendStatus(404)
  }

  await tournament.destroy()
  res.json(tournament.toJSON())
}

const router = Router()

router.delete('/:id', requestHandler)

export default router
