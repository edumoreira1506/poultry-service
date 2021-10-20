import express from 'express'
import { withBodyValidation } from '@cig-platform/core'

import withBreederParam from '@Middlewares/withBreederParam'
import withFileSupport from '@Middlewares/withFileSupport'
import { withFileUploadFactory } from '@Middlewares/withFileUpload'
import withBreederImageParam from '@Middlewares/withBreederImageParam'
import withPoultryParam from '@Middlewares/withPoultryParam'

import BreederController from '@Controllers/BreederController'
import BreederUserController from '@Controllers/BreederUserController'
import BreederImageController from '@Controllers/BreederImageController'
import BreederContactController from '@Controllers/BreederContactController'
import PoultryController from '@Controllers/PoultryController'
import PoultryImageController from '@Controllers/PoultryImageController'

import { storeBreederSchema, updateBreederSchema } from '@Schemas/BreederSchemas'
import { storeBreederUserSchema } from '@Schemas/BreederUserSchema'
import { storePoultrySchema, updatePoultrySchema } from '@Schemas/PoultrySchemas'
import { storeBreederContactSchema, updateBreederContactSchema } from '@Schemas/BreederContactSchema'
import withBreederContactParam from '@Middlewares/withBreederContactParam'

const router = express.Router()

router.post('/breeders', withBodyValidation(storeBreederSchema), BreederController.store)

router.get('/breeders', BreederController.index)

router.patch(
  '/breeders/:breederId',
  withBreederParam,
  withFileSupport,
  withFileUploadFactory({ folder: 'breeders', subfolder: 'profile' }),
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

router.post(
  '/breeders/:breederId/contacts',
  withBreederParam,
  withBodyValidation(storeBreederContactSchema),
  BreederContactController.store
)

router.delete(
  '/breeders/:breederId/contacts/:contactId',
  withBreederParam,
  withBreederContactParam,
  BreederContactController.remove
)

router.patch(
  '/breeders/:breederId/contacts/:contactId',
  withBreederParam,
  withBreederContactParam,
  withBodyValidation(updateBreederContactSchema),
  BreederContactController.update
)

router.get(
  '/breeders/:breederId/contacts',
  withBreederParam,
  BreederContactController.index
)

router.post(
  '/breeders/:breederId/images',
  withBreederParam,
  withFileSupport,
  withFileUploadFactory({ folder: 'breeders', subfolder: 'images' }),
  BreederImageController.store
)

router.get('/breeders/:breederId/images', withBreederParam, BreederImageController.index)

router.delete(
  '/breeders/:breederId/images/:breederImageId',
  withBreederParam,
  withBreederImageParam,
  BreederImageController.remove
)

router.post(
  '/breeders/:breederId/poultries',
  withBreederParam,
  withBodyValidation(storePoultrySchema),
  PoultryController.store
)

router.get('/breeders/:breederId/poultries', withBreederParam, PoultryController.index)

router.get('/breeders/:breederId/poultries/:poultryId', withBreederParam, withPoultryParam, PoultryController.show)

router.patch(
  '/breeders/:breederId/poultries/:poultryId',
  withBreederParam,
  withPoultryParam,
  withBodyValidation(updatePoultrySchema),
  PoultryController.update
)

router.post(
  '/breeders/:breederId/poultries/:poultryId/images',
  withBreederParam,
  withPoultryParam,
  withFileSupport,
  withFileUploadFactory({ folder: 'poultries', subfolder: 'images' }),
  PoultryImageController.store
)

export default router
