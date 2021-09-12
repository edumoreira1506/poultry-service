import faker from 'faker'
import { IPoultryAddress } from '@cig-platform/core'

import { AVAILABLE_PROVINCES } from '@Constants/poultry'

export default function addressFactory({
  city,
  province,
  street,
  zipcode,
  number,
}: IPoultryAddress = {
  city: faker.address.cityName(),
  province: AVAILABLE_PROVINCES[faker.datatype.number({ min: 0, max: AVAILABLE_PROVINCES.length - 1 })],
  street: faker.address.streetName(),
  zipcode: `${faker.datatype.number({ min: 10000, max: 99999 })}-${faker.datatype.number({ min: 100, max: 999 })}`,
  number: faker.datatype.number(1000)
}): IPoultryAddress {
  return {
    city,
    province,
    street,
    zipcode,
    number,
  }
}
