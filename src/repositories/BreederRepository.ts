import { EntityRepository, Like } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'
import { IUser } from '@cig-platform/types'

import Breeder from '@Entities/BreederEntity'

@EntityRepository(Breeder)
export default class BreederRepository extends BaseRepository<Breeder> {
  search(keyword = '') {
    return this.find({
      where: {
        name: Like(`%${keyword}%`),
        active: true
      }
    })
  }

  findByUser(userId: IUser['id'], keyword = '') {
    return this.find({
      join: {
        alias: 'breeder',
        innerJoin: {
          users: 'breeder.users',
        },
      },
      where: (qb: any) => {
        qb.where('users.userId = :userId AND breeder.active = true AND breeder.name LIKE :keyword', { userId, keyword: `%${keyword}%` })
      },
    })
  }

  findByCode(code: string) {
    return this.findOne({ code, active: true })
  }

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
}
