import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import BreederContact from '@Entities/BreederContactEntity'

@EntityRepository(BreederContact)
export default class BreederContactRepository extends BaseRepository<BreederContact> {
}
