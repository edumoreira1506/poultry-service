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
import withApiKey from '@Middlewares/withApiKey'

const router = express.Router()

router.get('/poultries', withApiKey, PoultryController.search)

router.get('/poultries/:poultryId', withApiKey, withJustPoultryParam, PoultryController.show)

router.post('/breeders', withApiKey, withBodyValidation(storeBreederSchema), BreederController.store)

router.get('/breeders', withApiKey, BreederController.index)

router.patch(
  '/breeders/:breederId',
  withApiKey,
  withBreederParam,
  withFileSupport,
  withFileUploadFactory({ folder: 'breeders', subfolder: 'profile' }),
  withBodyValidation(updateBreederSchema),
  BreederController.update
)

router.get(
  '/breeders/:breederId',
  withApiKey,
  withBreederParam,
  BreederController.show
)

router.delete(
  '/breeders/:breederId',
  withApiKey,
  withBreederParam,
  BreederController.remove
)

router.post(
  '/breeders/:breederId/rollback',
  withApiKey,
  withBreederParam,
  BreederController.rollback
)

router.post(
  '/breeders/:breederId/users',
  withApiKey,
  withBreederParam,
  withBodyValidation(storeBreederUserSchema),
  BreederUserController.store
)

router.post(
  '/breeders/:breederId/users/:breederUserId/rollback',
  withApiKey,
  withBreederParam,
  withBreederUserParam,
  BreederUserController.rollback
)

router.post(
  '/breeders/:breederId/contacts',
  withApiKey,
  withBreederParam,
  withBodyValidation(storeBreederContactSchema),
  BreederContactController.store
)

router.delete(
  '/breeders/:breederId/contacts/:contactId',
  withApiKey,
  withBreederParam,
  withBreederContactParam,
  BreederContactController.remove
)

router.patch(
  '/breeders/:breederId/contacts/:contactId',
  withApiKey,
  withBreederParam,
  withBreederContactParam,
  withBodyValidation(updateBreederContactSchema),
  BreederContactController.update
)

router.post(
  '/breeders/:breederId/contacts/:contactId/rollback',
  withApiKey,
  withBreederParam,
  withBreederContactParam,
  BreederContactController.rollback
)

router.get(
  '/breeders/:breederId/contacts',
  withApiKey,
  withBreederParam,
  BreederContactController.index
)

router.post(
  '/breeders/:breederId/images',
  withApiKey,
  withBreederParam,
  withFileSupport,
  withFileUploadFactory({ folder: 'breeders', subfolder: 'images' }),
  BreederImageController.store
)

router.get(
  '/breeders/:breederId/images',
  withApiKey,
  withBreederParam,
  BreederImageController.index
)

router.delete(
  '/breeders/:breederId/images/:breederImageId',
  withApiKey,
  withBreederParam,
  withBreederImageParam,
  BreederImageController.remove
)

router.post(
  '/breeders/:breederId/poultries',
  withApiKey,
  withBreederParam,
  withBodyValidation(storePoultrySchema),
  PoultryController.store
)

router.get(
  '/breeders/:breederId/poultries',
  withApiKey,
  withBreederParam,
  PoultryController.index
)

router.get(
  '/breeders/:breederId/poultries/:poultryId',
  withApiKey,
  withBreederParam,
  withPoultryParam,
  PoultryController.show
)

router.patch(
  '/breeders/:breederId/poultries/:poultryId',
  withApiKey,
  withBreederParam,
  withAlivePoultryParam,
  withBodyValidation(updatePoultrySchema),
  PoultryController.update
)

router.post(
  '/breeders/:breederId/poultries/:poultryId/transfer',
  withApiKey,
  withBreederParam,
  withAlivePoultryParam,
  withBodyValidation(transferPoultrySchema),
  PoultryController.transfer
)

router.post(
  '/breeders/:breederId/poultries/:poultryId/kill',
  withApiKey,
  withBreederParam,
  withAlivePoultryParam,
  PoultryController.kill
)

router.post(
  '/breeders/:breederId/poultries/:poultryId/images',
  withApiKey,
  withBreederParam,
  withAlivePoultryParam,
  withFileSupport,
  withFileUploadFactory({ folder: 'poultries', subfolder: 'images' }),
  PoultryImageController.store
)

router.get(
  '/breeders/:breederId/poultries/:poultryId/images',
  withApiKey,
  withBreederParam,
  withPoultryParam,
  PoultryImageController.index
)

router.delete(
  '/breeders/:breederId/poultries/:poultryId/images/:imageId',
  withApiKey,
  withBreederParam,
  withAlivePoultryParam,
  withPoultryImageParam,
  PoultryImageController.remove
)

router.post(
  '/breeders/:breederId/poultries/:poultryId/registers',
  withApiKey,
  withBreederParam,
  withAlivePoultryParam,
  withFileSupport,
  withFileUploadFactory({ folder: 'poultries', subfolder: 'registers' }),
  withBodyValidation(storeRegisterSchema),
  RegisterController.store
)

router.get(
  '/breeders/:breederId/poultries/:poultryId/registers',
  withApiKey,
  withBreederParam,
  withPoultryParam,
  RegisterController.index
)

export default router
