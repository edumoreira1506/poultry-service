import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import BreederImageRepository from '@Repositories/BreederImageRepository'
import BreederImage from '@Entities/BreederImageEntity'
import { RequestWithBreederAndFile } from '@Types/requests'
import i18n from '@Configs/i18n'

class BreederImageController extends BaseController<BreederImage, BreederImageRepository>  {
  constructor(repository: ObjectType<BreederImage>) {
    super(repository)

    this.store = this.store.bind(this)
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('messages.success'))
  async store(req: RequestWithBreederAndFile): Promise<void> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const fileNames = req.fileNames ?? []

    await this.repository.insertAll(fileNames, breeder.id)
  }
}

export default new BreederImageController(BreederImageRepository)
