import { NextFunction, Response } from 'express'
import { ApiError, BaseController, NotFoundError } from '@cig-platform/core'

import { PoultryUserRequest } from '@Types/requests'
import PoultryController from '@Controllers/PoultryController'
import PoultryRepository from '@Repositories/PoultryRepository'

export const withPoultryParamFactory = (errorCallback: (res: Response, error: ApiError) => Response, repository?: PoultryRepository) => {
  return async (request: PoultryUserRequest, response: Response, next: NextFunction): Promise<void | Response<string, Record<string, string>>> => {
    const poultryId = request?.params?.poultryId

    const poultryRepository = repository ?? PoultryController.repository

    return poultryRepository.findById(poultryId)
      .then(poultry => {
        if (!poultry) throw new NotFoundError()

        request.poultry = poultry

        next()
      })
      .catch((error) => errorCallback(response, error?.getError?.() ?? error))
  }
}

export default withPoultryParamFactory(BaseController.errorResponse)
