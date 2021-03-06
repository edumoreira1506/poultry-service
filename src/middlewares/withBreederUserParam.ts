import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import BreederUserController from '@Controllers/BreederUserController'
import BreederUserRepository from '@Repositories/BreederUserRepository'
import Breeder from '@Entities/BreederEntity'
import { RequestWithBreederAndBreederUser } from '@Types/requests'

export const withBreederUserParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response) =>
    (req: RequestWithBreederAndBreederUser, res: Response, next: NextFunction) => {
      return withRequestParam<BreederUserRepository, Breeder>('breederUserId', 'breederUser', BreederUserController, errorCallback)(req, res, () => {
        try {
          if (!req.breederUser || !req.breeder) throw new NotFoundError()
          if (req.breederUser.breederId !== req.breeder.id) throw new AuthError()

          next()
        } catch (error: any) {
          return errorCallback(res, error?.getError?.() ?? error)
        }
      })
    }

export default withBreederUserParamFactory(BaseController.errorResponse)
