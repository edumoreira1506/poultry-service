import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'
import { IUser } from '@cig-platform/types'

import Poultry from '@Entities/PoultryEntity'

@EntityRepository(Poultry)
export default class PoultryRepository extends BaseRepository<Poultry> {
  findByUser(userId: IUser['id']) {
    return this.find({
      join: {
        alias: 'poultry',
        innerJoin: {
          users: 'poultry.users',
        },
      },
      where: (qb: any) => {
        qb.where('users.userId = :userId', { userId })
      },
    })
  }
}
