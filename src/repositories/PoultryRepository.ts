import { EntityRepository, Repository } from 'typeorm'

import Poultry from '@Entities/PoultryEntity'

@EntityRepository(Poultry)
export default class PoultryRepository extends Repository<Poultry> {
}
