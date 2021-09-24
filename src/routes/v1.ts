import express from 'express'
import { withBodyValidation } from '@cig-platform/core'

import BreederController from '@Controllers/BreederController'
import BreederUserController from '@Controllers/BreederUserController'
import { storeBreederSchema, updateBreederSchema } from '@Schemas/BreederSchemas'
import { storeBreederUserSchema } from '@Schemas/BreederUserSchema'
import withBreederParam from '@Middlewares/withBreederParam'

const router = express.Router()

router.post('/breeders', withBodyValidation(storeBreederSchema), BreederController.store)

router.get('/breeders', BreederController.index)

router.patch(
  '/breeders/:breederId',
  withBreederParam,
  withBodyValidation(updateBreederSchema),
  BreederController.update
)

router.get(
  '/breeders/:breederId',
  withBreederParam,
  BreederController.show
)

router.post(
  '/breeders/:breederId/users',
  withBreederParam,
  withBodyValidation(storeBreederUserSchema),
  BreederUserController.store
)

export default router
