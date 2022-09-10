import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import BreederImageController from '@Controllers/BreederImageController'
import Breeder from '@Entities/BreederEntity'
import { RequestWithBreederAndBreederImage } from '@Types/requests'

export const withBreederImageParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response) =>
    (req: RequestWithBreederAndBreederImage, res: Response, next: NextFunction) => {
      return withRequestParam<Breeder>('breederImageId', 'breederImage', BreederImageController, errorCallback)(req, res, () => {
        try {
          if (!req.breederImage || !req.breeder) throw new NotFoundError()
          if (req.breederImage.breederId !== req.breeder.id) throw new AuthError()

          next()
        } catch (error: any) {
          return errorCallback(res, error?.getError?.() ?? error)
        }
      })
    }

export default withBreederImageParamFactory(BaseController.errorResponse)
