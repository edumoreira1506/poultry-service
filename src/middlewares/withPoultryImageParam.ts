import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import PoultryImageController from '@Controllers/PoultryImageController'
import { RequestWithPoultryImageAndPoultryAndBreeder } from '@Types/requests'
import PoultryImage from '@Entities/PoultryImageEntity'

export const withPoultryImageParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response) =>
    (req: RequestWithPoultryImageAndPoultryAndBreeder, res: Response, next: NextFunction) => {
      return withRequestParam<PoultryImage>('imageId', 'poultryImage', PoultryImageController, errorCallback)(req, res, () => {
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
