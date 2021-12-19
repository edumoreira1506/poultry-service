import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import Register from '@Entities/RegisterEntity'

@EntityRepository(Register)
export default class RegisterRepository extends BaseRepository<Register> {
  findByPoultry(poultryId: string, registerType = '') {
    return this.find({
      where: {
        poultryId,
        active: true,
        ...(registerType ? ({ type: registerType }) : ({  }))
      },
      relations: ['files'],
      order: {
        date: 'DESC'
      }
    })
  }
}
