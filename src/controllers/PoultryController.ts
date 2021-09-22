import { Request, Response } from 'express'
import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import PoultryRepository from '@Repositories/PoultryRepository'
import Poultry from '@Entities/PoultryEntity'
import PoultryBuilder from '@Builders/PoultryBuilder'
import { RequestWithPoultry } from '@Types/requests'

class PoultryController extends BaseController<Poultry, PoultryRepository>  {
  constructor(repository: ObjectType<Poultry>) {
    super(repository)

    this.store = this.store.bind(this)
    this.update = this.update.bind(this)
    this.show = this.show.bind(this)
    this.index = this.index.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: Request, res: Response): Promise<Response> {
    const poultryDTO = await new PoultryBuilder()
      .setName(req.body.name)
      .setDescription(req.body.description)
      .setAddress(req.body.address)
      .build()

    const poultry = await this.repository.save(poultryDTO)

    return BaseController.successResponse(res, { poultry, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.updated'))
  async update(req: RequestWithPoultry): Promise<void> {
    const poultry = req.poultry

    if (!poultry) throw new NotFoundError()

    const newPoultry = { ...poultry, ...req.body }
    const poultryDTO = await new PoultryBuilder()
      .setName(newPoultry.name)
      .setDescription(newPoultry.description)
      .setAddress(newPoultry.address)
      .build()

    await this.repository.updateById(newPoultry.id, poultryDTO)
  }

  @BaseController.errorHandler()
  async show(req: RequestWithPoultry, res: Response): Promise<Response> {
    const poultry = req.poultry

    if (!poultry) throw new NotFoundError()

    return BaseController.successResponse(res, { poultry })
  }

  @BaseController.errorHandler()
  async index(_: Request, res: Response): Promise<Response> {
    const poultries = await this.repository.all()

    return BaseController.successResponse(res, { poultries })
  }
}

export default new PoultryController(PoultryRepository)
