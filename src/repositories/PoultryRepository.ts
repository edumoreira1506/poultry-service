import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'
import { IUser } from '@cig-platform/types'

import Poultry from '@Entities/PoultryEntity'

@EntityRepository(Poultry)
export default class PoultryRepository extends BaseRepository<Poultry> {
  findByUser(userId: IUser['id']) {
    return this.find({
      relations: ['users'],
      where: {
        users: {
          id: userId
        }
      }
    })
  }
}
