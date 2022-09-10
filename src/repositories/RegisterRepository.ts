import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'

import Register from '@Entities/RegisterEntity'
import { dataSource } from '@Configs/database'

const BaseRepository = BaseRepositoryFunctionsGenerator<Register>()

const RegisterRepository = dataSource.getRepository(Register).extend({
  ...BaseRepository,
  
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
})

export default RegisterRepository
