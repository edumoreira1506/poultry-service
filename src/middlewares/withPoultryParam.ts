import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import Poultry from '@Entities/PoultryEntity'
import { RequestWithPoultryAndBreeder } from '@Types/requests'
import PoultryRepository from '@Repositories/PoultryRepository'

export const withPoultryParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response, { justAlive = false }: { justAlive?: boolean } = {}) =>
    (req: RequestWithPoultryAndBreeder, res: Response, next: NextFunction) => {
      return withRequestParam<Poultry>('poultryId', 'poultry', PoultryRepository, errorCallback)(req, res, () => {
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

export const withJustPoultryParam = withRequestParam<Poultry>('poultryId', 'poultry', PoultryRepository, BaseController.errorResponse)

export const withAlivePoultryParam = withPoultryParamFactory(BaseController.errorResponse, { justAlive: true })
