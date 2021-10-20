import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import PoultryImageRepository from '@Repositories/PoultryImageRepository'
import PoultryImage from '@Entities/PoultryImageEntity'
import { RequestWithPoultryAndBreederAndFile } from '@Types/requests'
import i18n from '@Configs/i18n'

class PoultryImageController extends BaseController<PoultryImage, PoultryImageRepository>  {
  constructor(repository: ObjectType<PoultryImage>) {
    super(repository)

    this.store = this.store.bind(this)
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('messages.success'))
  async store(req: RequestWithPoultryAndBreederAndFile): Promise<void> {
    const poultry = req.poultry

    if (!poultry) throw new NotFoundError()

    const fileNames = req.fileNames ?? []

    await this.repository.insertAll(fileNames, poultry.id)
  }
}

export default new PoultryImageController(PoultryImageRepository)
