import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import PoultryImage from '@Entities/PoultryImageEntity'

@EntityRepository(PoultryImage)
export default class PoultryImageRepository extends BaseRepository<PoultryImage> {
  insertAll(imagesPaths: string[], poultryId: string) {
    const images = imagesPaths.map(imagePath => ({ imageUrl: imagePath, poultryId }))

    return this.insert(images)
  }
}
