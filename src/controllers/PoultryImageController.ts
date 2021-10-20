import { ObjectType } from 'typeorm'
import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import PoultryImageRepository from '@Repositories/PoultryImageRepository'
import PoultryImage from '@Entities/PoultryImageEntity'
import { RequestWithPoultryAndBreeder, RequestWithPoultryAndBreederAndFile } from '@Types/requests'
import i18n from '@Configs/i18n'

class PoultryImageController extends BaseController<PoultryImage, PoultryImageRepository>  {
  constructor(repository: ObjectType<PoultryImage>) {
    super(repository)

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('messages.success'))
  async store(req: RequestWithPoultryAndBreederAndFile): Promise<void> {
    const poultry = req.poultry

    if (!poultry) throw new NotFoundError()

    const fileNames = req.fileNames ?? []

    await this.repository.insertAll(fileNames, poultry.id)
  }

  @BaseController.errorHandler()
  async index(req: RequestWithPoultryAndBreeder, res: Response) {
    const poultry = req.poultry

    if (!poultry) throw new NotFoundError()

    const poultryImages = await this.repository.findByPoultry(poultry.id)

    return BaseController.successResponse(res, { poultryImages })
  }
}

export default new PoultryImageController(PoultryImageRepository)
