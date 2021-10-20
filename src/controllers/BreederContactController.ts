import { Response } from 'express'
import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import BreederContactRepository from '@Repositories/BreederContactRepository'
import BreederContact from '@Entities/BreederContactEntity'
import { RequestWithBreeder, RequestWithBreederContact } from '@Types/requests'
import BreederContactBuilder from '@Builders/BreederContactBuilder'
import i18n from '@Configs/i18n'

class BreederContactController extends BaseController<BreederContact, BreederContactRepository>  {
  constructor(repository: ObjectType<BreederContact>) {
    super(repository)

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
    this.remove = this.remove.bind(this)
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

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.deleted'))
  async remove(req: RequestWithBreederContact) {
    const contact = req.breederContact

    if (!contact) throw new NotFoundError()

    await this.repository.deleteById(contact.id)
  }

  @BaseController.errorHandler()
  async index(req: RequestWithBreeder, res: Response) {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const contacts = await this.repository.findByBreeder(breeder.id)

    return BaseController.successResponse(res, { contacts })
  }
}

export default new BreederContactController(BreederContactRepository)
