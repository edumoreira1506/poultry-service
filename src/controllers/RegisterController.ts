import { ObjectType } from 'typeorm'
import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import RegisterRepository from '@Repositories/RegisterRepository'
import Register from '@Entities/RegisterEntity'
import { RequestWithPoultryAndBreederAndFile } from '@Types/requests'
import RegisterBuilder from '@Builders/RegisterBuilder'

class RegisterController extends BaseController<Register, RegisterRepository>  {
  constructor(repository: ObjectType<Register>) {
    super(repository)

    this.store = this.store.bind(this)
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

    return BaseController.successResponse(res, { register })
  }
}

export default new RegisterController(RegisterRepository)
