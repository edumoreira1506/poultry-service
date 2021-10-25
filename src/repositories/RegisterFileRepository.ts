import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import RegisterFile from '@Entities/RegisterFileEntity'

@EntityRepository(RegisterFile)
export default class RegisterFileRepository extends BaseRepository<RegisterFile> {
  insertAll(fileNames: string[], registerId: string) {
    const images = fileNames.map(fileName => ({ fileName, registerId }))

    return this.insert(images)
  }
}
