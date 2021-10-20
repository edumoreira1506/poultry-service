import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import BreederContactController from '@Controllers/BreederContactController'
import Breeder from '@Entities/BreederEntity'
import { RequestWithBreederAndBreederContact } from '@Types/requests'
import BreederContactRepository from '@Repositories/BreederContactRepository'

export const withBreederContactParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response) =>
    (req: RequestWithBreederAndBreederContact, res: Response, next: NextFunction) => {
      return withRequestParam<BreederContactRepository, Breeder>('contactId', 'breederContact', BreederContactController, errorCallback)(req, res, () => {
        try {
          if (!req.breederContact || !req.breeder) throw new NotFoundError()
          if (req.breederContact.breederId !== req.breeder.id) throw new AuthError()

          next()
        } catch (error: any) {
          return errorCallback(res, error?.getError?.() ?? error)
        }
      })
    }

export default withBreederContactParamFactory(BaseController.errorResponse)
