import faker from 'faker'

import { IPoultryUser } from '@Types/poultry'

export default function poultryUserFactory({
  id = faker.datatype.uuid(),
  userId = faker.datatype.uuid(),
  poultryId = faker.datatype.uuid()
}: Partial<IPoultryUser> = {}): IPoultryUser {
  return {
    id,
    userId,
    poultryId
  }
}
