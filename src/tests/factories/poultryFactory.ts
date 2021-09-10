import faker from 'faker'

import { IPoultry } from '@Types/poultry'
import addressFactory from './addressFactory'

export default function poultryFactory({
  id,
  name,
  description,
  address,
}: IPoultry = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  description: faker.lorem.word(200),
  address: addressFactory()
}): IPoultry {
  return {
    id,
    description,
    address,
    name
  }
}
