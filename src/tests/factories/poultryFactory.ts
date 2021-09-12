import faker from 'faker'
import { IPoultry } from '@cig-platform/core'

import addressFactory from './addressFactory'

export default function poultryFactory({
  id = faker.datatype.uuid(),
  name = faker.name.findName(),
  description = faker.lorem.word(200),
  address = addressFactory(),
  active = true,
}: Partial<IPoultry> = {}): IPoultry {
  return {
    id,
    description,
    address,
    name,
    active
  }
}
