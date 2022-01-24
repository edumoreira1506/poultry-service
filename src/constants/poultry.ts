import { PoultryGenderEnum } from '@cig-platform/enums'

export const MINIMUM_CHARACTERS_NAME = 3
export const MAXIMUM_CHARACTERS_NAME = 200

export const MINIMUM_CHARACTERS_DESCRIPTION = 3
export const MAXIMUM_CHARACTERS_DESCRIPTION = 250

export const MAX_MONTHS_CHILDREN = {
  [PoultryGenderEnum.Female]: 11,
  [PoultryGenderEnum.Male]: 11
}
