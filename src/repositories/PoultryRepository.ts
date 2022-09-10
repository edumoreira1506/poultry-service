import { Not, In, Like, FindOptionsWhere } from 'typeorm'
import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'

import Poultry from '@Entities/PoultryEntity'
import { dataSource } from '@Configs/database'

const BaseRepository = BaseRepositoryFunctionsGenerator<Poultry>()

const ITEMS_PER_PAGE = 30

const PoultryRepository = dataSource.getRepository(Poultry).extend({
  ...BaseRepository,

  findById(id: string) {
    return this.findOne({
      where: {
        id,
        active: true
      },
      relations: ['mom', 'dad']
    })
  },

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
    page?: number;
  } = {}) {
    const queryParams = createFilters({
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
    })

    return this.find({
      where: queryParams,
      relations: ['images'],
      skip: page * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE
    })
  },

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
    breederId?: string;
  } = {}) {
    const queryParams = createFilters({
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
      breederId
    })

    const poultriesAmount = await this.count({
      where: queryParams
    })

    return Math.ceil(poultriesAmount / ITEMS_PER_PAGE)
  },

  findByBreeder(
    breederId: string,
    {
      gender,
      genderCategory,
      poultryIds = [],
      page = 0,
      name
    }: {
      gender?: string;
      genderCategory?: string;
      poultryIds?: string[];
      page?: number;
      name?: string;
    } = {}
  ) {
    const where = createFilters({
      gender: [gender].filter(Boolean) as string[],
      genderCategory: [genderCategory].filter(Boolean) as string[],
      poultryIds,
      breederId,
      name
    })

    return this.find({
      where,
      relations: ['images'],
      skip: page * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE
    })
  },

  findByBreederAndRegister(breederId: string, register: string, id = '') {
    return this.findOne({
      where: {
        breeder: { id: breederId },
        active: true,
        register,
        ...(id ? { id: Not(id) } : {}),
      }
    })
  }
})

export default PoultryRepository

function createFilters({
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
  }
  const queryParams = [
    (name ? { name: Like(`%${name}%`), ...commonQueryParams } : undefined),
    (description ? { description: Like(`%${description}%`), ...commonQueryParams } : undefined),
    (!name && !description ? commonQueryParams : undefined)
  ].filter(Boolean) as FindOptionsWhere<Poultry>[]

  return queryParams
}
