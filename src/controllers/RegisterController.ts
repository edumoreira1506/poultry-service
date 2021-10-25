import { getCustomRepository, ObjectType } from 'typeorm'
import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import RegisterRepository from '@Repositories/RegisterRepository'
import Register from '@Entities/RegisterEntity'
import { RequestWithPoultryAndBreederAndFile } from '@Types/requests'
import RegisterBuilder from '@Builders/RegisterBuilder'
import RegisterFileRepository from '@Repositories/RegisterFileRepository'
import RegisterFile from '@Entities/RegisterFileEntity'

class RegisterController extends BaseController<Register, RegisterRepository>  {
  private _fileEntity: ObjectType<RegisterFile>;

  constructor(repository: ObjectType<Register>, registerFile: ObjectType<RegisterFile>) {
    super(repository)

    this._fileEntity = registerFile

    this.store = this.store.bind(this)
  }

  get registerFileRepository() {
    const repository = getCustomRepository<RegisterFileRepository>(this._fileEntity)

    return repository
  }

  @BaseController.errorHandler()
  async store(req: RequestWithPoultryAndBreederAndFile, res: Response) {
    const poultry = req.poultry

    if (!poultry) throw new NotFoundError()

    const registerDTO = new RegisterBuilder()
      .setDescription(req.body.description)
      .setPoultry(poultry)
      .setType(req.body.type)
      .build()

    const register = await this.repository.save(registerDTO)

    const fileNames = req.fileNames ?? []

    await this.registerFileRepository.insertAll(fileNames, register.id)

    return BaseController.successResponse(res, { register })
  }
}

export default new RegisterController(RegisterRepository, RegisterFileRepository)
