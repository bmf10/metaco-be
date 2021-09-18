import { Router } from 'express'
import list from './list'

const router = Router()

router.use(list)

export default router
