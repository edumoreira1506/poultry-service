import { Response } from 'express'
import { ApiError, BaseController, NotFoundError } from '@cig-platform/core'

import BreederContactRepository from '@Repositories/BreederContactRepository'
import { RequestWithBreeder, RequestWithBreederAndBreederContact, RequestWithBreederContact } from '@Types/requests'
import BreederContactBuilder from '@Builders/BreederContactBuilder'
import i18n from '@Configs/i18n'

class BreederContactController {
  private repository: typeof BreederContactRepository

  constructor(_repository: typeof BreederContactRepository) {
    this.repository = _repository

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
    this.rollback = this.rollback.bind(this)
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
  @BaseController.actionHandler(i18n.__('common.updated'))
  async update(req: RequestWithBreederAndBreederContact) {
    const contact = req.breederContact
    const breeder = req.breeder

    if (!contact || !breeder) throw new NotFoundError()

    const newContact = { ...contact, ...req.body }

    const newContactDTO = new BreederContactBuilder()
      .setType(newContact.type)
      .setValue(newContact.value)
      .setBreeder(breeder)
      .build()

    await this.repository.updateById(newContact.id, {
      type: newContactDTO.type,
      value: newContactDTO.value,
      breeder,
    })
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

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('messages.removed'))
  async rollback(req: RequestWithBreederAndBreederContact): Promise<void> {
    const breederContact = req.breederContact

    if (!breederContact || !breederContact?.createdAt) throw new NotFoundError()

    const now = new Date()
    const breederContactCreatedAt = breederContact.createdAt
    const diffInMilliSeconds = Math.abs(now.getTime() - breederContactCreatedAt.getTime())
    const diffInSeconds = diffInMilliSeconds / 1000

    if (diffInSeconds > 60) throw new ApiError(i18n.__('rollback.errors.expired'))

    await this.repository.delete({ id: breederContact.id })
  }
}

export default new BreederContactController(BreederContactRepository)
