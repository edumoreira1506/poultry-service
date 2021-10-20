import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import PoultryImageController from '@Controllers/PoultryImageController'
import PoultryImageRepository from '@Repositories/PoultryImageRepository'
import Poultry from '@Entities/PoultryEntity'
import { RequestWithPoultryImageAndPoultryAndBreeder } from '@Types/requests'

export const withPoultryImageParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response) =>
    (req: RequestWithPoultryImageAndPoultryAndBreeder, res: Response, next: NextFunction) => {
      return withRequestParam<PoultryImageRepository, Poultry>('imageId', 'poultryImage', PoultryImageController, errorCallback)(req, res, () => {
        try {
          if (!req.poultryImage || !req.poultry) throw new NotFoundError()
          if (req.poultryImage.poultryId !== req.poultry.id) throw new AuthError()

          next()
        } catch (error: any) {
          return errorCallback(res, error?.getError?.() ?? error)
        }
      })
    }

export default withPoultryImageParamFactory(BaseController.errorResponse)
