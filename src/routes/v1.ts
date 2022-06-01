import express from 'express'
import { withBodyValidation } from '@cig-platform/core'

import withBreederParam from '@Middlewares/withBreederParam'
import withFileSupport from '@Middlewares/withFileSupport'
import { withFileUploadFactory } from '@Middlewares/withFileUpload'
import withBreederImageParam from '@Middlewares/withBreederImageParam'
import withPoultryParam, { withAlivePoultryParam, withJustPoultryParam } from '@Middlewares/withPoultryParam'
import withBreederContactParam from '@Middlewares/withBreederContactParam'
import withPoultryImageParam from '@Middlewares/withPoultryImageParam'

import BreederController from '@Controllers/BreederController'
import BreederUserController from '@Controllers/BreederUserController'
import BreederImageController from '@Controllers/BreederImageController'
import BreederContactController from '@Controllers/BreederContactController'
import PoultryController from '@Controllers/PoultryController'
import PoultryImageController from '@Controllers/PoultryImageController'
import RegisterController from '@Controllers/RegisterController'

import { storeBreederSchema, updateBreederSchema } from '@Schemas/BreederSchemas'
import { storeBreederUserSchema } from '@Schemas/BreederUserSchema'
import { storePoultrySchema, transferPoultrySchema, updatePoultrySchema } from '@Schemas/PoultrySchemas'
import { storeBreederContactSchema, updateBreederContactSchema } from '@Schemas/BreederContactSchema'
import { storeRegisterSchema } from '@Schemas/RegisterSchemas'
import withBreederUserParam from '@Middlewares/withBreederUserParam'

const router = express.Router()

router.get('/poultries', PoultryController.search)

router.get('/poultries/:poultryId', withJustPoultryParam, PoultryController.show)

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

router.delete(
  '/breeders/:breederId',
  withBreederParam,
  BreederController.remove
)

router.post(
  '/breeders/:breederId/rollback',
  withBreederParam,
  BreederController.rollback
)

router.post(
  '/breeders/:breederId/users',
  withBreederParam,
  withBodyValidation(storeBreederUserSchema),
  BreederUserController.store
)

router.post(
  '/breeders/:breederId/users/:breederUserId/rollback',
  withBreederParam,
  withBreederUserParam,
  BreederUserController.rollback
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

router.post(
  '/breeders/:breederId/contacts/:contactId/rollback',
  withBreederParam,
  withBreederContactParam,
  BreederContactController.rollback
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
  withAlivePoultryParam,
  withBodyValidation(updatePoultrySchema),
  PoultryController.update
)

router.post(
  '/breeders/:breederId/poultries/:poultryId/transfer',
  withBreederParam,
  withAlivePoultryParam,
  withBodyValidation(transferPoultrySchema),
  PoultryController.transfer
)

router.post(
  '/breeders/:breederId/poultries/:poultryId/kill',
  withBreederParam,
  withAlivePoultryParam,
  PoultryController.kill
)

router.post(
  '/breeders/:breederId/poultries/:poultryId/images',
  withBreederParam,
  withAlivePoultryParam,
  withFileSupport,
  withFileUploadFactory({ folder: 'poultries', subfolder: 'images' }),
  PoultryImageController.store
)

router.get(
  '/breeders/:breederId/poultries/:poultryId/images',
  withBreederParam,
  withPoultryParam,
  PoultryImageController.index
)

router.delete(
  '/breeders/:breederId/poultries/:poultryId/images/:imageId',
  withBreederParam,
  withAlivePoultryParam,
  withPoultryImageParam,
  PoultryImageController.remove
)

router.post(
  '/breeders/:breederId/poultries/:poultryId/registers',
  withBreederParam,
  withAlivePoultryParam,
  withFileSupport,
  withFileUploadFactory({ folder: 'poultries', subfolder: 'registers' }),
  withBodyValidation(storeRegisterSchema),
  RegisterController.store
)

router.get(
  '/breeders/:breederId/poultries/:poultryId/registers',
  withBreederParam,
  withPoultryParam,
  RegisterController.index
)

export default router
