import { EntityRepository, Not, In } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import Poultry from '@Entities/PoultryEntity'

@EntityRepository(Poultry)
export default class PoultryRepository extends BaseRepository<Poultry> {
  search({
    gender,
    genderCategory,
    poultryIds = [],
    forSale,
    type,
    crest,
    dewlap,
    tail,
    description,
    name
  }: {
    gender?: string;
    genderCategory?: string;
    poultryIds?: string[];
    forSale?: boolean;
    type?: string;
    crest?: string;
    dewlap?: string;
    tail?: string;
    description?: string;
    name?: string;
  } = {}) {
    return this.find({
      where: {
        active: true,
        ...(gender ? { gender } : {}),
        ...(genderCategory ? { genderCategory } : {}),
        ...(poultryIds.length ? { id: In(poultryIds) } : {}),
        ...(typeof forSale === 'boolean' ? { forSale } : {}),
        ...(type ? { type } : {}),
        ...(crest ? { crest } : {}),
        ...(dewlap ? { dewlap } : {}),
        ...(tail ? { tail } : {}),
        ...(name ? { name } : {}),
        ...(description ? { description } : {}),
      },
      relations: ['images'],
    })
  }

  findByBreeder(
    breederId: string,
    {
      gender,
      genderCategory,
      poultryIds = [],
    }: {
      gender?: string;
      genderCategory?: string;
      poultryIds?: string[];
    } = {}
  ) {
    return this.find({
      where: {
        breeder: { id: breederId },
        active: true,
        ...(gender ? { gender } : {}),
        ...(genderCategory ? { genderCategory } : {}),
        ...(poultryIds.length ? { id: In(poultryIds) } : {}),
      },
      relations: ['images'],
    })
  }

  findByBreederAndRegister(breederId: string, register: string, id = '') {
    return this.findOne({
      breeder: { id: breederId },
      active: true,
      register,
      ...(id ? { id: Not(id) } : {}),
    })
  }
}
