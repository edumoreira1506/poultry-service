import { Request, Response } from 'express'
import { ApiError, BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import BreederRepository from '@Repositories/BreederRepository'
import BreederBuilder from '@Builders/BreederBuilder'
import { RequestWithBreederAndFile, RequestWithBreeder } from '@Types/requests'

class BreederController {
  private repository: typeof BreederRepository

  constructor(_repository: typeof BreederRepository) {
    this.repository = _repository

    this.store = this.store.bind(this)
    this.update = this.update.bind(this)
    this.show = this.show.bind(this)
    this.index = this.index.bind(this)
    this.rollback = this.rollback.bind(this)
    this.remove = this.remove.bind(this)
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.deleted'))
  async remove(req: RequestWithBreeder) {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    await this.repository.deleteById(breeder.id)
  }

  @BaseController.errorHandler()
  async store(req: Request, res: Response): Promise<Response> {
    const breederDTO = await new BreederBuilder(this.repository)
      .setName(req.body.name)
      .setDescription(req.body.description)
      .setAddress(req.body.address)
      .setFoundationDate(req.body.foundationDate)
      .setMainVideo(req.body.mainVideo)
      .setCode(req.body.code)
      .build()

    const breeder = await this.repository.save(breederDTO)

    return BaseController.successResponse(res, { breeder, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.updated'))
  async update(req: RequestWithBreederAndFile): Promise<void> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const address = req.body.address ? JSON.parse(req.body.address) : breeder.address
    const profileImageUrl = req.fileNames?.[0] || breeder.profileImageUrl
    const newBreeder = { ...breeder, ...req.body, address }
    const breederDTO = await new BreederBuilder(this.repository)
      .setName(newBreeder.name)
      .setProfileImageUrl(profileImageUrl)
      .setDescription(newBreeder.description)
      .setAddress(newBreeder.address)
      .setFoundationDate(newBreeder.foundationDate)
      .setMainVideo(newBreeder.mainVideo)
      .build()

    await this.repository.updateById(newBreeder.id, {
      description: breederDTO.description,
      address: breederDTO.address,
      foundationDate: breederDTO.foundationDate,
      name: breederDTO.name,
      profileImageUrl: breederDTO.profileImageUrl,
      mainVideo: breederDTO.mainVideo,
    })
  }

  @BaseController.errorHandler()
  async show(req: RequestWithBreeder, res: Response): Promise<Response> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    return BaseController.successResponse(res, { breeder })
  }

  @BaseController.errorHandler()
  async index(req: Request, res: Response): Promise<Response> {
    const userIdQueryParam = String(req.query?.userId ?? '')
    const keywordQueryParam = String(req.query?.keyword ?? '')
    const breeders = userIdQueryParam
      ? await this.repository
        .createQueryBuilder('breeder')
        .innerJoinAndSelect('breeder.users', 'users')
        .where('users.userId = :userId')
        .andWhere('breeder.active = true')
        .andWhere('breeder.name LIKE :keyword')
        .setParameters({ userId: userIdQueryParam, keyword: `%${keywordQueryParam}%` })
        .getMany()
      : await this.repository.search(keywordQueryParam)

    return BaseController.successResponse(res, { breeders })
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('messages.removed'))
  async rollback(req: RequestWithBreeder): Promise<void> {
    const breeder = req.breeder

    if (!breeder) throw new NotFoundError()

    const now = new Date()
    const breederCreatedAt = breeder.createdAt
    const diffInMilliSeconds = Math.abs(now.getTime() - breederCreatedAt.getTime())
    const diffInSeconds = diffInMilliSeconds / 1000

    if (diffInSeconds > 60) throw new ApiError(i18n.__('rollback.errors.expired'))

    await this.repository.delete({ id: breeder.id })
  }
}

export default new BreederController(BreederRepository)
