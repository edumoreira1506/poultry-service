import { ObjectType } from 'typeorm'
import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import PoultryImageRepository from '@Repositories/PoultryImageRepository'
import PoultryImage from '@Entities/PoultryImageEntity'
import { RequestWithPoultryAndBreeder, RequestWithPoultryAndBreederAndFile, RequestWithPoultryImageAndPoultryAndBreeder } from '@Types/requests'
import i18n from '@Configs/i18n'

class PoultryImageController extends BaseController<PoultryImage, PoultryImageRepository>  {
  constructor(repository: ObjectType<PoultryImage>) {
    super(repository)

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
    this.remove = this.remove.bind(this)
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

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.deleted'))
  async remove (req: RequestWithPoultryImageAndPoultryAndBreeder) {
    const poultryImage = req.poultryImage

    if (!poultryImage) throw new NotFoundError()

    await this.repository.deleteById(poultryImage.id)
  }
}

export default new PoultryImageController(PoultryImageRepository)
