import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'
import { dataSource } from '@Configs/database'

import BreederImage from '@Entities/BreederImageEntity'

const BaseRepository = BaseRepositoryFunctionsGenerator<BreederImage>()

const BreederImageRepository = dataSource.getRepository(BreederImage).extend({
  ...BaseRepository,

  insertAll(imagesPaths: string[], breederId: string) {
    const images = imagesPaths.map(imagePath => ({ imageUrl: imagePath, breederId }))

    return this.insert(images)
  },

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  },

  findByBreeder(breederId: string) {
    return this.find({
      where: {
        breederId, active: true
      }
    })
  }
})

export default BreederImageRepository
