import { EntityRepository, Not } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import Poultry from '@Entities/PoultryEntity'

@EntityRepository(Poultry)
export default class PoultryRepository extends BaseRepository<Poultry> {
  findByBreeder(breederId: string, { gender }: { gender?: string; } = {}) {
    return this.find({
      where: {
        breeder: { id: breederId },
        active: true,
        ...(gender ? ({ gender }) : ({}))
      },
      relations: ['images']
    })
  }

  findByBreederAndRegister(breederId: string, register: string, id = '') {
    return this.findOne({
      breeder: { id: breederId },
      active: true,
      register,
      ...(id ? ({ id: Not(id) }) : ({}))
    })
  }
}
