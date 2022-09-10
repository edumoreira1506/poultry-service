import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storeBreederSchema, updateBreederSchema } from '@Schemas/BreederSchemas'

const breederDocs = {
  ...createDoc('/breeders', ['Breeders'], [
    {
      method: 'post',
      title: 'Store breeder',
      objectSchema: storeBreederSchema,
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
    {
      method: 'get',
      title: 'Get breeders',
      queryParams: [{ type: 'string', name: 'userId' }, { type: 'string', name: 'keyword' }],
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    }
  ]),
  ...createDoc('/breeders/{breederId}', ['Breeders'], [
    {
      method: 'get',
      title: 'Get breeder',
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
    {
      method: 'patch',
      title: 'Update breeder',
      objectSchema: updateBreederSchema,
      files: ['files'],
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
    {
      method: 'delete',
      title: 'Remove breeder',
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  }),
  ...createDoc('/breeders/{breederId}/rollback', ['Breeders'], [
    {
      method: 'post',
      title: 'Rollback breeder register',
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  })
}

export default breederDocs
