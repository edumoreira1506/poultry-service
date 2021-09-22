import express from 'express'
import { withBodyValidation } from '@cig-platform/core'

import PoultryController from '@Controllers/PoultryController'
import PoultryUserController from '@Controllers/PoultryUserController'
import { storePoultrySchema, updatePoultrySchema } from '@Schemas/PoultrySchemas'
import { storePoultryUserSchema } from '@Schemas/PoultryUserSchema'
import withPoultryParam from '@Middlewares/withPoultryParam'

const router = express.Router()

router.post('/poultries', withBodyValidation(storePoultrySchema), PoultryController.store)

router.get('/poultries', PoultryController.index)

router.patch(
  '/poultries/:poultryId',
  withPoultryParam,
  withBodyValidation(updatePoultrySchema),
  PoultryController.update
)

router.get(
  '/poultries/:poultryId',
  withPoultryParam,
  PoultryController.show
)

router.post(
  '/poultries/:poultryId/users',
  withPoultryParam,
  withBodyValidation(storePoultryUserSchema),
  PoultryUserController.store
)

export default router
