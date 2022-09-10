import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import { RequestWithBreederAndBreederUser } from '@Types/requests'
import BreederUser from '@Entities/BreederUserEntity'
import BreederUserRepository from '@Repositories/BreederUserRepository'

export const withBreederUserParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response) =>
    (req: RequestWithBreederAndBreederUser, res: Response, next: NextFunction) => {
      return withRequestParam<BreederUser>('breederUserId', 'breederUser', BreederUserRepository, errorCallback)(req, res, () => {
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
