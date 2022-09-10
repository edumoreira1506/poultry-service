import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storeBreederUserSchema } from '@Schemas/BreederUserSchema'

const breederUserDocs = {
  ...createDoc('/breeders/{breederId}/users', ['Breeder users'], [
    {
      method: 'post',
      title: 'Store breeder user',
      objectSchema: storeBreederUserSchema,
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  }),
  ...createDoc('/breeders/{breederId}/users/{userId}/rollback', ['Breeder users'], [
    {
      method: 'post',
      title: 'Rollback breeder user register',
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }, { type: 'string', name: 'userId' }]
  })
}

export default breederUserDocs
