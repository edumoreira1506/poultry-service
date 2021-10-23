import { Response } from 'express'
import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import PoultryRepository from '@Repositories/PoultryRepository'
import Poultry from '@Entities/PoultryEntity'
import PoultryBuilder from '@Builders/PoultryBuilder'
import { RequestWithBreeder, RequestWithPoultryAndBreeder } from '@Types/requests'

class PoultryController extends BaseController<Poultry, PoultryRepository>  {
  constructor(repository: ObjectType<Poultry>) {
    super(repository)

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
    this.update = this.update.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: RequestWithBreeder, res: Response): Promise<Response> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const poultryDTO = await new PoultryBuilder(this.repository)
      .setType(req.body.type)
      .setBirthDate(req.body.birthDate)
      .setColors(req.body.colors)
      .setVideos(req.body.videos)
      .setGender(req.body.gender)
      .setName(req.body.name)
      .setDewlap(req.body.dewlap)
      .setRegister(req.body.register)
      .setCrest(req.body.crest)
      .setBreeder(breeder)
      .build()

    const poultry = await this.repository.save(poultryDTO)

    return BaseController.successResponse(res, { poultry, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  async index(req: RequestWithBreeder, res: Response): Promise<Response> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const poultries = await this.repository.findByBreeder(breeder.id)

    return BaseController.successResponse(res, { poultries })
  }

  @BaseController.errorHandler()
  async show(req: RequestWithPoultryAndBreeder, res: Response): Promise<Response> {
    const poultry = req.poultry

    if (!poultry) throw new NotFoundError()

    return BaseController.successResponse(res, { poultry })
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.updated'))
  async update(req: RequestWithPoultryAndBreeder): Promise<void> {
    const poultry = req.poultry
    const breeder = req.breeder

    if (!poultry || !breeder) throw new NotFoundError()

    const newPoultry = { ...poultry, ...req.body }

    const poultryDTO = await new PoultryBuilder(this.repository)
      .setType(newPoultry.type)
      .setBirthDate(newPoultry.birthDate)
      .setColors(newPoultry.colors)
      .setVideos(newPoultry.videos)
      .setRegister(newPoultry.register)
      .setName(newPoultry.name)
      .setDewlap(newPoultry.dewlap)
      .setId(newPoultry.id)
      .setCrest(newPoultry.crest)
      .setBreeder(breeder)
      .build()

    await this.repository.updateById(poultry.id, {
      type: poultryDTO.type,
      birthDate: poultryDTO.birthDate,
      colors: poultryDTO.colors,
      videos: poultryDTO.videos,
      name: poultryDTO.name,
      register: poultryDTO.register,
      dewlap: poultryDTO.dewlap,
      crest: poultryDTO.crest,
    })
  }
}

export default new PoultryController(PoultryRepository)
