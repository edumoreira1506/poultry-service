import { Request, Response } from 'express'
import { ObjectType } from 'typeorm'
import BaseController from '@cig-platform/core/build/controllers/BaseController'

import i18n from '@Configs/i18n'
import PoultryRepository from '@Repositories/PoultryRepository'
import Poultry from '@Entities/PoultryEntity'
import PoultryBuilder from '@Builders/PoultryBuilder'

class PoultryController extends BaseController<Poultry, PoultryRepository>  {
  constructor(repository: ObjectType<Poultry>) {
    super(repository)

    this.store = this.store.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: Request, res: Response): Promise<Response> {
    const poultryDTO = new PoultryBuilder()
      .setName(req.body.name)
      .setDescription(req.body.description)
      .setAddress(req.body.address)
      .build()

    const poultry = await this.repository.save(poultryDTO)

    return res.send({ ok: true, message: i18n.__('messages.success'), poultry })
  }
}

export default new PoultryController(PoultryRepository)
