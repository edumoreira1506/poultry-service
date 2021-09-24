import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import BreederUser from '@Entities/BreederUserEntity'

@EntityRepository(BreederUser)
export default class BreederUserRepository extends BaseRepository<BreederUser> {
}
