import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'

import PoultryImage from '@Entities/PoultryImageEntity'
import { dataSource } from '@Configs/database'

const BaseRepository = BaseRepositoryFunctionsGenerator<PoultryImage>()

const PoultryImageRepository = dataSource.getRepository(PoultryImage).extend({
  ...BaseRepository,

  insertAll(imagesPaths: string[], poultryId: string) {
    const images = imagesPaths.map(imagePath => ({ imageUrl: imagePath, poultryId }))

    return this.insert(images)
  },

  findByPoultry(poultryId: string) {
    return this.find({
      where: {
        poultryId, active: true
      }
    })
  },

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
})

export default PoultryImageRepository
