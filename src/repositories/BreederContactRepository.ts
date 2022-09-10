import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'
import { dataSource } from '@Configs/database'

import BreederContact from '@Entities/BreederContactEntity'

const BaseRepository = BaseRepositoryFunctionsGenerator<BreederContact>()

const BreederContactRepository = dataSource.getRepository(BreederContact).extend({
  ...BaseRepository,

  findByBreeder(breederId: string) {
    return this.find({
      where: {
        breederId, active: true
      }
    })
  },

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
})

export default BreederContactRepository
