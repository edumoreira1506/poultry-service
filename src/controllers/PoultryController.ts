import { Response } from 'express'
import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import PoultryRepository from '@Repositories/PoultryRepository'
import Poultry from '@Entities/PoultryEntity'
import PoultryBuilder from '@Builders/PoultryBuilder'
import { RequestWithBreeder } from '@Types/requests'

class PoultryController extends BaseController<Poultry, PoultryRepository>  {
  constructor(repository: ObjectType<Poultry>) {
    super(repository)

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: RequestWithBreeder, res: Response): Promise<Response> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const poultryDTO = new PoultryBuilder()
      .setType(req.body.type)
      .setBirthDate(req.body.birthDate)
      .setColors(req.body.colors)
      .setVideos(req.body.videos)
      .setBreeder(breeder)
      .build()

    const poultry = await this.repository.save(poultryDTO)

    return BaseController.successResponse(res, { poultry, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  async index(req: RequestWithBreeder, res: Response): Promise<Response> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const poultries = await this.repository.findByBreeder(breeder.id)

    return BaseController.successResponse(res, { poultries })
  }
}

export default new PoultryController(PoultryRepository)
