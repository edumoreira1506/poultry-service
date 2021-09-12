import express from 'express'
import { withBodyValidation } from '@cig-platform/core'

import PoultryController from '@Controllers/PoultryController'
import { storePoultrySchema } from '@Schemas/PoultrySchemas'
import PoultryUserController from '@Controllers/PoultryUserController'
import { storePoultryUserSchema } from '@Schemas/PoultryUserSchema'
import withPoultryParam from '@Middlewares/withPoultryParam'

const router = express.Router()

router.post('/poultries', withBodyValidation(storePoultrySchema), PoultryController.store)

router.post(
  '/poultries/:poultryId/users',
  withPoultryParam,
  withBodyValidation(storePoultryUserSchema),
  PoultryUserController.store
)

export default router
