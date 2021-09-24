import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storeBreederUserSchema } from '@Schemas/BreederUserSchema'

const breederUserDocs = {
  ...createDoc('/breeders/{breederId}/users', ['Breeder users'], [
    {
      method: 'post',
      title: 'Store breeder user',
      objectSchema: storeBreederUserSchema,
    },
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  })
}

export default breederUserDocs
