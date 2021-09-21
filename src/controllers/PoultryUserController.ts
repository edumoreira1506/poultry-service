import { Response } from 'express'
import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import PoultryUserRepository from '@Repositories/PoultryUserRepository'
import PoultryUser from '@Entities/PoultryUserEntity'
import { RequestWithPoultry } from '@Types/requests'
import PoultryUserBuilder from '@Builders/PoultryUserBuilder'
import i18n from '@Configs/i18n'

class PoultryUserController extends BaseController<PoultryUser, PoultryUserRepository>  {
  constructor(repository: ObjectType<PoultryUser>) {
    super(repository)

    this.store = this.store.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: RequestWithPoultry, res: Response): Promise<Response> {
    const poultry = req.poultry

    if (!poultry) throw new NotFoundError()

    const poultryUserDTO = await new PoultryUserBuilder()
      .setPoultry(poultry)
      .setUserId(req.body.userId)
      .build()

    const poultryUser = await this.repository.save(poultryUserDTO)

    return BaseController.successResponse(res, { poultryUser, message: i18n.__('messages.success') })
  }
}

export default new PoultryUserController(PoultryUserRepository)
