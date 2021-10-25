import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import Register from '@Entities/RegisterEntity'

@EntityRepository(Register)
export default class RegisterRepository extends BaseRepository<Register> {
}
