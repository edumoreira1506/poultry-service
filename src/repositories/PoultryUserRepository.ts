import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import PoultryUser from '@Entities/PoultryUserEntity'

@EntityRepository(PoultryUser)
export default class PoultryUserRepository extends BaseRepository<PoultryUser> {
}
