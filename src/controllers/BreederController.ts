import { Request, Response } from 'express'
import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import BreederRepository from '@Repositories/BreederRepository'
import Breeder from '@Entities/BreederEntity'
import BreederBuilder from '@Builders/BreederBuilder'
import { RequestWithBreeder } from '@Types/requests'

class BreederController extends BaseController<Breeder, BreederRepository>  {
  constructor(repository: ObjectType<Breeder>) {
    super(repository)

    this.store = this.store.bind(this)
    this.update = this.update.bind(this)
    this.show = this.show.bind(this)
    this.index = this.index.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: Request, res: Response): Promise<Response> {
    const breederDTO = await new BreederBuilder()
      .setName(req.body.name)
      .setDescription(req.body.description)
      .setAddress(req.body.address)
      .setFoundationDate(req.body.foundationDate)
      .build()

    const breeder = await this.repository.save(breederDTO)

    return BaseController.successResponse(res, { breeder, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.updated'))
  async update(req: RequestWithBreeder): Promise<void> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const address = req.body.address ? JSON.parse(req.body.address) : breeder.address
    const newBreeder = { ...breeder, ...req.body, address }
    const breederDTO = await new BreederBuilder()
      .setName(newBreeder.name)
      .setDescription(newBreeder.description)
      .setAddress(newBreeder.address)
      .setFoundationDate(newBreeder.foundationDate)
      .build()

    await this.repository.updateById(newBreeder.id, {
      description: breederDTO.description,
      address: breederDTO.address,
      foundationDate: breederDTO.foundationDate,
      name: breederDTO.name,
    })
  }

  @BaseController.errorHandler()
  async show(req: RequestWithBreeder, res: Response): Promise<Response> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    return BaseController.successResponse(res, { breeder })
  }

  @BaseController.errorHandler()
  async index(req: Request, res: Response): Promise<Response> {
    const userIdQueryParam = req.query?.userId
    const breeders = userIdQueryParam
      ? await this.repository.findByUser(String(userIdQueryParam))
      : await this.repository.all()

    return BaseController.successResponse(res, { breeders })
  }
}

export default new BreederController(BreederRepository)
