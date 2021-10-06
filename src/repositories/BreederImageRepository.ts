import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import BreederImage from '@Entities/BreederImageEntity'

@EntityRepository(BreederImage)
export default class BreederImageRepository extends BaseRepository<BreederImage> {
  insertAll(imagesPaths: string[], breederId: string) {
    const images = imagesPaths.map(imagePath => ({ imageUrl: imagePath, breederId }))

    return this.insert(images)
  }

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }

  findByBreeder(breederId: string) {
    return this.find({ breederId, active: true })
  }
}
