import { Response, Request } from 'express'
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
    this.transfer = this.transfer.bind(this)
    this.search = this.search.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: RequestWithBreeder, res: Response): Promise<Response> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const poultryDTO = await new PoultryBuilder(this.repository)
      .setType(req.body.type)
      .setDescription(req.body.description)
      .setBirthDate(req.body.birthDate)
      .setColors(req.body.colors)
      .setVideos(req.body.videos)
      .setGender(req.body.gender)
      .setName(req.body.name)
      .setDewlap(req.body.dewlap)
      .setRegister(req.body.register)
      .setCrest(req.body.crest)
      .setTail(req.body.tail)
      .setGenderCategory(req.body.genderCategory)
      .setBreeder(breeder)
      .build()

    const poultry = await this.repository.save(poultryDTO)

    return BaseController.successResponse(res, { poultry, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  async index(req: RequestWithBreeder, res: Response): Promise<Response> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const genderQueryParam = req.query?.gender
    const genderCategoryQueryParam = req?.query?.genderCategory
    const poultryIds = (req?.query?.poultryIds?.toString() ?? '').split(',').filter(Boolean).filter(Boolean)
    const poultries = await this.repository.findByBreeder(breeder.id, {
      gender: genderQueryParam?.toString(),
      genderCategory: genderCategoryQueryParam?.toString(),
      poultryIds
    })
    const formattedPoultries = poultries.map(poultry => {
      const images = poultry.images?.filter(image => image.active)

      return {
        ...poultry,
        mainImage: images?.[0]?.imageUrl
      }
    })

    return BaseController.successResponse(res, { poultries: formattedPoultries })
  }

  @BaseController.errorHandler()
  async search(req: Request, res: Response): Promise<Response> {
    const gender = req.query?.gender?.toString()?.split(',').filter(Boolean) ?? []
    const type = req.query?.type?.toString().split(',').filter(Boolean) ?? []
    const tail = req.query?.tail?.toString().split(',').filter(Boolean) ?? []
    const dewlap = req.query?.dewlap?.toString().split(',').filter(Boolean) ?? []
    const crest = req.query?.crest?.toString().split(',').filter(Boolean) ?? []
    const description = req.query?.description?.toString()
    const name = req.query?.name?.toString()
    const genderCategory = req?.query?.genderCategory?.toString()?.split(',').filter(Boolean) ?? []
    const forSale = req?.query?.forSale ? Boolean(req?.query?.forSale === 'true') : undefined
    const poultryIds = (req?.query?.poultryIds?.toString() ?? '').split(',').filter(Boolean)
    const poultries = await this.repository.search({
      gender,
      genderCategory,
      poultryIds,
      forSale,
      type,
      tail,
      dewlap,
      crest,
      description,
      name,
    })
    const formattedPoultries = poultries.map(poultry => {
      const images = poultry.images?.filter(image => image.active)

      return {
        ...poultry,
        mainImage: images?.[0]?.imageUrl
      }
    })

    return BaseController.successResponse(res, { poultries: formattedPoultries })
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
      .setDescription(newPoultry.description)
      .setVideos(newPoultry.videos)
      .setRegister(newPoultry.register)
      .setName(newPoultry.name)
      .setDewlap(newPoultry.dewlap)
      .setId(newPoultry.id)
      .setCrest(newPoultry.crest)
      .setTail(newPoultry.tail)
      .setGenderCategory(newPoultry.genderCategory)
      .setForSale(newPoultry.forSale)
      .setCurrentAdvertisingPrice(newPoultry.currentAdvertisingPrice)
      .setBreeder(breeder)
      .build()

    await this.repository.updateById(poultry.id, {
      type: poultryDTO.type,
      birthDate: poultryDTO.birthDate,
      colors: poultryDTO.colors,
      videos: poultryDTO.videos,
      name: poultryDTO.name,
      register: poultryDTO.register,
      genderCategory: poultryDTO.genderCategory,
      dewlap: poultryDTO.dewlap,
      crest: poultryDTO.crest,
      tail: poultryDTO.tail,
      description: poultryDTO.description,
      forSale: poultryDTO.forSale,
      currentAdvertisingPrice: poultryDTO.currentAdvertisingPrice
    })
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.updated'))
  async transfer(req: RequestWithPoultryAndBreeder): Promise<void> {
    const poultry = req.poultry
    const breeder = req.breeder

    if (!poultry || !breeder) throw new NotFoundError()

    await this.repository.updateById(poultry.id, {
      breederId: req.body.breederId
    })
  }
}

export default new PoultryController(PoultryRepository)
