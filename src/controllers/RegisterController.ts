import { getCustomRepository, ObjectType } from 'typeorm'
import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import RegisterRepository from '@Repositories/RegisterRepository'
import Register from '@Entities/RegisterEntity'
import { RequestWithPoultryAndBreeder, RequestWithPoultryAndBreederAndFile } from '@Types/requests'
import RegisterBuilder from '@Builders/RegisterBuilder'
import RegisterFileRepository from '@Repositories/RegisterFileRepository'
import RegisterFile from '@Entities/RegisterFileEntity'

class RegisterController extends BaseController<Register, RegisterRepository>  {
  private _fileEntity: ObjectType<RegisterFile>;

  constructor(repository: ObjectType<Register>, registerFile: ObjectType<RegisterFile>) {
    super(repository)

    this._fileEntity = registerFile

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
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
      .setDate(req.body.date)
      .setMetadata(JSON.parse(req.body.metadata || '{}'))
      .build()

    const register = await this.repository.save(registerDTO)

    const fileNames = req.fileNames ?? []

    await this.registerFileRepository.insertAll(fileNames, register.id)

    return BaseController.successResponse(res, { register })
  }

  @BaseController.errorHandler()
  async index(req: RequestWithPoultryAndBreeder, res: Response) {
    const poultry = req.poultry
    const registerType = String(req.query?.registerType ?? '')

    if (!poultry) throw new NotFoundError()

    const registers = await this.repository.findByPoultry(poultry.id, registerType)

    return BaseController.successResponse(res, { registers })
  }
}

export default new RegisterController(RegisterRepository, RegisterFileRepository)
