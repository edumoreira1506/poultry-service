import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'
import { IUser } from '@cig-platform/types'

import Breeder from '@Entities/BreederEntity'

@EntityRepository(Breeder)
export default class BreederRepository extends BaseRepository<Breeder> {
  findByUser(userId: IUser['id']) {
    return this.find({
      join: {
        alias: 'breeder',
        innerJoin: {
          users: 'breeder.users',
        },
      },
      where: (qb: any) => {
        qb.where('users.userId = :userId', { userId })
      },
    })
  }

  findByCode(code: string) {
    return this.findOne({ code })
  }

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
}
