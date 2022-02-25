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
    gender?: string[];
    genderCategory?: string[];
    poultryIds?: string[];
    forSale?: boolean;
    type?: string[];
    crest?: string[];
    dewlap?: string[];
    tail?: string[];
    description?: string;
    name?: string;
  } = {}) {
    const commonQueryParams = {
      active: true,
      ...(gender?.length ? { gender: In(gender) } : {}),
      ...(genderCategory?.length ? { genderCategory: In(genderCategory) } : {}),
      ...(poultryIds.length ? { id: In(poultryIds) } : {}),
      ...(type?.length ? { type: In(type) } : {}),
      ...(crest?.length ? { crest: In(crest) } : {}),
      ...(dewlap?.length ? { dewlap: In(dewlap) } : {}),
      ...(tail?.length ? { tail: In(tail) } : {}),
      ...(typeof forSale === 'boolean' ? { forSale } : {}),
    }
    const queryParams = [
      (name ? { name: Like(`%${name}%`), ...commonQueryParams } : undefined),
      (description ? { description: Like(`%${description}%`), ...commonQueryParams } : undefined),
      (!name && !description ? commonQueryParams : undefined)
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
