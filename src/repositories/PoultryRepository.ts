import { EntityRepository, Not, In, Like, Between } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import Poultry from '@Entities/PoultryEntity'

const ITEMS_PER_PAGE = 30

@EntityRepository(Poultry)
export default class PoultryRepository extends BaseRepository<Poultry> {
  static createFilters({
    gender,
    genderCategory,
    poultryIds = [],
    forSale,
    type,
    crest,
    dewlap,
    tail,
    description,
    name,
    prices,
    breederId
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
    prices?: { min?: number; max?: number };
    breederId?: string;
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
      ...(breederId ? { breederId } : {}),
      ...(typeof prices?.min === 'number' && typeof prices?.max === 'number' ? {
        currentAdvertisingPrice: Between(prices.min, prices.max)
      } : {})
    }
    const queryParams = [
      (name ? { name: Like(`%${name}%`), ...commonQueryParams } : undefined),
      (description ? { description: Like(`%${description}%`), ...commonQueryParams } : undefined),
      (!name && !description ? commonQueryParams : undefined)
    ].filter(Boolean)

    return queryParams
  }

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
    name,
    prices,
    sort,
    page = 0
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
    prices?: { min?: number; max?: number };
    sort?: string;
    page?: number;
  } = {}) {
    const queryParams = PoultryRepository.createFilters({
      gender,
      genderCategory,
      poultryIds,
      forSale,
      type,
      crest,
      dewlap,
      tail,
      description,
      name,
      prices,
    })

    return this.find({
      where: queryParams,
      relations: ['images'],
      order: {
        ...(sort === 'MAX_TO_MIN' ? { currentAdvertisingPrice: 'DESC' } : {}),
        ...(sort === 'MIN_TO_MAX' ? { currentAdvertisingPrice: 'ASC' } : {}),
      },
      skip: page * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE
    })
  }

  async countPages({
    gender,
    genderCategory,
    poultryIds = [],
    forSale,
    type,
    crest,
    dewlap,
    tail,
    description,
    name,
    prices,
    breederId
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
    prices?: { min?: number; max?: number };
    breederId?: string;
  } = {}) {
    const queryParams = PoultryRepository.createFilters({
      gender,
      genderCategory,
      poultryIds,
      forSale,
      type,
      crest,
      dewlap,
      tail,
      description,
      name,
      prices,
      breederId
    })

    const poultriesAmount = await this.count({
      where: queryParams
    })

    return Math.ceil(poultriesAmount / ITEMS_PER_PAGE)
  }

  findByBreeder(
    breederId: string,
    {
      gender,
      genderCategory,
      poultryIds = [],
      page = 0,
    }: {
      gender?: string;
      genderCategory?: string;
      poultryIds?: string[];
      page?: number;
    } = {}
  ) {
    const where = PoultryRepository.createFilters({
      gender: [gender].filter(Boolean) as string[],
      genderCategory: [genderCategory].filter(Boolean) as string[],
      poultryIds,
      breederId
    })

    return this.find({
      where,
      relations: ['images'],
      skip: page * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE
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
