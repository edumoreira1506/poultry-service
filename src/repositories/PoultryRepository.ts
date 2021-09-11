import { EntityRepository, Repository } from 'typeorm'
import { FindEntityErrorHandler } from '@cig-platform/core'

import Poultry from '@Entities/PoultryEntity'

@EntityRepository(Poultry)
export default class PoultryRepository extends Repository<Poultry> {
  @FindEntityErrorHandler()
  findById(id: string) {
    return this.findOne({ id })
  }
}
