import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import PoultryController from '@Controllers/PoultryController'
import PoultryRepository from '@Repositories/PoultryRepository'
import Poultry from '@Entities/PoultryEntity'
import { RequestWithPoultryAndBreeder } from '@Types/requests'

export const withPoultryParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response, { justAlive = false }: { justAlive?: boolean } = {}) =>
    (req: RequestWithPoultryAndBreeder, res: Response, next: NextFunction) => {
      return withRequestParam<PoultryRepository, Poultry>('poultryId', 'poultry', PoultryController, errorCallback)(req, res, () => {
        try {
          if (!req.poultry || !req.breeder) throw new NotFoundError()
          if (req.poultry.breederId !== req.breeder.id) throw new AuthError()
          if (!req.poultry.isAlive && justAlive) throw new NotFoundError()

          next()
        } catch (error: any) {
          return errorCallback(res, error?.getError?.() ?? error)
        }
      })
    }

export default withPoultryParamFactory(BaseController.errorResponse)

export const withJustPoultryParam = withRequestParam<PoultryRepository, Poultry>('poultryId', 'poultry', PoultryController, BaseController.errorResponse)

export const withAlivePoultryParam = withPoultryParamFactory(BaseController.errorResponse, { justAlive: true })
