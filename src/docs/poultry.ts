import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storePoultrySchema, updatePoultrySchema } from '@Schemas/PoultrySchemas'

const poultryDocs = {
  ...createDoc('/breeders/{breederId}/poultries', ['Poultries'], [
    {
      method: 'post',
      title: 'Register poultry',
      objectSchema: storePoultrySchema,
    },
    {
      method: 'get',
      title: 'Get poultries',
      queryParams: [{ type: 'string', name: 'gender' }]
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  }),
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}', ['Poultries'], [
    {
      method: 'get',
      title: 'Get poultry'
    },
    {
      method: 'patch',
      title: 'Update poultry',
      objectSchema: updatePoultrySchema
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }, { type: 'string', name: 'poultryId' }]
  }),
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/images', ['Poultry images'], [
    {
      method: 'post',
      title: 'Register poultry image',
      files: ['files']
    },
    {
      method: 'get',
      title: 'Get poultry images',
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }, { type: 'string', name: 'poultryId' }]
  }),
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/images/{imageId}', ['Poultry images'], [
    {
      method: 'delete',
      title: 'Remove poultry image',
    },
  ], {
    pathVariables: [
      { type: 'string', name: 'breederId' },
      { type: 'string', name: 'poultryId' },
      { type: 'string', name: 'imageId' }
    ]
  })
}

export default poultryDocs
