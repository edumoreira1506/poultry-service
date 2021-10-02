import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storeBreederSchema, updateBreederSchema } from '@Schemas/BreederSchemas'

const breederDocs = {
  ...createDoc('/breeders', ['Breeders'], [
    {
      method: 'post',
      title: 'Store breeder',
      objectSchema: storeBreederSchema,
    },
    {
      method: 'get',
      title: 'Get breeders',
      queryParams: [{ type: 'string', name: 'userId' }]
    }
  ]),
  ...createDoc('/breeders/{breederId}', ['Breeders'], [
    {
      method: 'get',
      title: 'Get breeder',
    },
    {
      method: 'patch',
      title: 'Update breeder',
      objectSchema: updateBreederSchema,
      files: ['files']
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  })
}

export default breederDocs
