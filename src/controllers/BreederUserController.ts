import { Response } from 'express'
import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import BreederUserRepository from '@Repositories/BreederUserRepository'
import BreederUser from '@Entities/BreederUserEntity'
import { RequestWithBreeder } from '@Types/requests'
import BreederUserBuilder from '@Builders/BreederUserBuilder'
import i18n from '@Configs/i18n'

class BreederUserController extends BaseController<BreederUser, BreederUserRepository>  {
  constructor(repository: ObjectType<BreederUser>) {
    super(repository)

    this.store = this.store.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: RequestWithBreeder, res: Response): Promise<Response> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const breederUserDTO = await new BreederUserBuilder()
      .setBreeder(breeder)
      .setUserId(req.body.userId)
      .build()

    const breederUser = await this.repository.save(breederUserDTO)

    return BaseController.successResponse(res, { breederUser, message: i18n.__('messages.success') })
  }
}

export default new BreederUserController(BreederUserRepository)
