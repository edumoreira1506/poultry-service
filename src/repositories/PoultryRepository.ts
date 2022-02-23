import { EntityRepository, Not, In, Like } from 'typeorm'
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
    const commonQueryParams = { active: true }
    const queryParams = [
      (gender ? { gender, ...commonQueryParams } : undefined),
      (genderCategory ? { genderCategory, ...commonQueryParams } : undefined),
      (poultryIds.length ? { id: In(poultryIds), ...commonQueryParams } : undefined),
      (typeof forSale === 'boolean' ? { forSale, ...commonQueryParams } : undefined),
      (type ? { type, ...commonQueryParams } : undefined),
      (crest ? { crest, ...commonQueryParams } : undefined),
      (dewlap ? { dewlap, ...commonQueryParams } : undefined),
      (tail ? { tail, ...commonQueryParams } : undefined),
      (name ? { name: Like(`%${name}%`), ...commonQueryParams } : undefined),
      (description ? { description: Like(`%${description}%`), ...commonQueryParams } : undefined),
      commonQueryParams
    ].filter(Boolean)

    return this.find({
      where: queryParams,
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
