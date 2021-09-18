import { Router } from 'express'
import user from './user'
import tournamentResult from './tournamentResult'
import tournament from './tournament'
import team from './team'

const router = Router()

router.use('/user', user)
router.use('/tournament-result', tournamentResult)
router.use('/tournament', tournament)
router.use('/team', team)

export default router
