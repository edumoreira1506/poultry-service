import { RegisterTypeEnum } from '@cig-platform/enums'

export const MINIMUM_CHARACTERS_DESCRIPTION = 3
export const MAXIMUM_CHARACTERS_DESCRIPTION = 200

export const TYPES_WITH_METADATA = [
  RegisterTypeEnum.Advertising,
  RegisterTypeEnum.RemoveAdvertising,
  RegisterTypeEnum.Transfer,
  RegisterTypeEnum.Vaccination,
  RegisterTypeEnum.MeasurementAndWeighing
]
