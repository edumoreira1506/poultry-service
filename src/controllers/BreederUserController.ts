import { Response } from 'express'
import { ObjectType } from 'typeorm'
import { ApiError, BaseController, NotFoundError } from '@cig-platform/core'

import BreederUserRepository from '@Repositories/BreederUserRepository'
import BreederUser from '@Entities/BreederUserEntity'
import { RequestWithBreeder, RequestWithBreederUser } from '@Types/requests'
import BreederUserBuilder from '@Builders/BreederUserBuilder'
import i18n from '@Configs/i18n'

class BreederUserController extends BaseController<BreederUser, BreederUserRepository>  {
  constructor(repository: ObjectType<BreederUser>) {
    super(repository)

    this.store = this.store.bind(this)
    this.rollback = this.rollback.bind(this)
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

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('messages.removed'))
  async rollback(req: RequestWithBreederUser): Promise<void> {
    const breederUser = req.breederUser

    if (!breederUser) throw new NotFoundError()

    const now = new Date()
    const breederUserCreatedAt = breederUser.createdAt
    const diffInMilliSeconds = Math.abs(now.getTime() - breederUserCreatedAt.getTime())
    const diffInSeconds = diffInMilliSeconds / 1000

    if (diffInSeconds > 60) throw new ApiError(i18n.__('rollback.errors.expired'))

    await this.repository.delete({ id: breederUser.id })
  }
}

export default new BreederUserController(BreederUserRepository)
