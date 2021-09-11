import { EntityRepository, Repository } from 'typeorm'

import PoultryUser from '@Entities/PoultryUserEntity'

@EntityRepository(PoultryUser)
export default class PoultryUserRepository extends Repository<PoultryUser> {
}
