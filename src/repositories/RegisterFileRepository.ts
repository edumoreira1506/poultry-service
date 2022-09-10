import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'

import RegisterFile from '@Entities/RegisterFileEntity'
import { dataSource } from '@Configs/database'

const BaseRepository = BaseRepositoryFunctionsGenerator<RegisterFile>()

const RegisterFileRepository = dataSource.getRepository(RegisterFile).extend({
  ...BaseRepository,
  
  insertAll(fileNames: string[], registerId: string) {
    const images = fileNames.map(fileName => ({ fileName, registerId }))

    return this.insert(images)
  }
})

export default RegisterFileRepository
