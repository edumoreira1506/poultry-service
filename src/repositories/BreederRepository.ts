import { Like } from 'typeorm'
import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'

import Breeder from '@Entities/BreederEntity'
import { dataSource } from '@Configs/database'

const BaseRepository = BaseRepositoryFunctionsGenerator<Breeder>()

const BreederRepository = dataSource.getRepository(Breeder).extend({
  ...BaseRepository,

  search(keyword = '') {
    return this.find({
      where: {
        name: Like(`%${keyword}%`),
        active: true
      }
    })
  },

  findByCode(code: string) {
    return this.findOne({ where: { code, active: true } })
  },

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
})

export default BreederRepository
