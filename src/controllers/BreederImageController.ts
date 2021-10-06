import { ObjectType } from 'typeorm'
import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import BreederImageRepository from '@Repositories/BreederImageRepository'
import BreederImage from '@Entities/BreederImageEntity'
import { RequestWithBreeder, RequestWithBreederAndFile, RequestWithBreederImage } from '@Types/requests'
import i18n from '@Configs/i18n'

class BreederImageController extends BaseController<BreederImage, BreederImageRepository>  {
  constructor(repository: ObjectType<BreederImage>) {
    super(repository)

    this.store = this.store.bind(this)
    this.remove = this.remove.bind(this)
    this.index = this.index.bind(this)
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('messages.success'))
  async store(req: RequestWithBreederAndFile): Promise<void> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const fileNames = req.fileNames ?? []

    await this.repository.insertAll(fileNames, breeder.id)
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.deleted'))
  async remove(req: RequestWithBreederImage): Promise<void> {
    const breederImage = req.breederImage

    if (!breederImage) throw new NotFoundError()

    await this.repository.deleteById(breederImage.id)
  }

  @BaseController.errorHandler()
  async index(req: RequestWithBreeder, res: Response): Promise<Response> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const breederImages = await this.repository.findByBreeder(breeder.id)

    return BaseController.successResponse(res, { breederImages })
  }
}

export default new BreederImageController(BreederImageRepository)
