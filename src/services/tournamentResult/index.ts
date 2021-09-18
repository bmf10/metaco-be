import { Router } from 'express'
import create from './create'
import edit from './edit'
import leaderboard from './leaderboard'
import deleteResult from './delete'
import list from './list'

const router = Router()

router.use(create)
router.use(edit)
router.use(leaderboard)
router.use(deleteResult)
router.use(list)

export default router
