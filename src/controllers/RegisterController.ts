import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import RegisterRepository from '@Repositories/RegisterRepository'
import { RequestWithPoultryAndBreeder, RequestWithPoultryAndBreederAndFile } from '@Types/requests'
import RegisterBuilder from '@Builders/RegisterBuilder'
import RegisterFileRepository from '@Repositories/RegisterFileRepository'

class RegisterController  {
  private repository: typeof RegisterRepository
  private registerFileRepository: typeof RegisterFileRepository

  constructor(
    _repository: typeof RegisterRepository,
    _registerFileRepository:  typeof RegisterFileRepository
  ) {
    this.repository = _repository
    this.registerFileRepository = _registerFileRepository

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
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
