import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'

import { dataSource } from '@Configs/database'
import BreederUser from '@Entities/BreederUserEntity'

const BaseRepository = BaseRepositoryFunctionsGenerator<BreederUser>()

const BreederUserRepository = dataSource.getRepository(BreederUser).extend({
  ...BaseRepository,
})

export default BreederUserRepository
