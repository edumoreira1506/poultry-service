import express from 'express'
import { withBodyValidation } from '@cig-platform/core'

import PoultryController from '@Controllers/PoultryController'
import { storePoultrySchema } from '@Schemas/PoultrySchemas'

const router = express.Router()

router.post('/poultries', withBodyValidation(storePoultrySchema), PoultryController.store)

export default router
