import { Response } from 'express'
import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import BreederContactRepository from '@Repositories/BreederContactRepository'
import BreederContact from '@Entities/BreederContactEntity'
import { RequestWithBreeder } from '@Types/requests'
import BreederContactBuilder from '@Builders/BreederContactBuilder'
import i18n from '@Configs/i18n'

class BreederContactController extends BaseController<BreederContact, BreederContactRepository>  {
  constructor(repository: ObjectType<BreederContact>) {
    super(repository)

    this.store = this.store.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: RequestWithBreeder, res: Response): Promise<Response> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const breederContactDTO = new BreederContactBuilder()
      .setBreeder(breeder)
      .setType(req.body.type)
      .setValue(req.body.value)
      .build()

    const contact = await this.repository.save(breederContactDTO)

    return BaseController.successResponse(res, { contact, message: i18n.__('messages.success') })
  }
}

export default new BreederContactController(BreederContactRepository)
