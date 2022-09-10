import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storePoultrySchema, transferPoultrySchema, updatePoultrySchema } from '@Schemas/PoultrySchemas'
import { storeRegisterSchema } from '@Schemas/RegisterSchemas'

const poultryDocs = {
  ...createDoc('/breeders/{breederId}/poultries', ['Poultries'], [
    {
      method: 'post',
      title: 'Register poultry',
      objectSchema: storePoultrySchema,
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
    {
      method: 'get',
      title: 'Get poultries',
      queryParams: [
        { type: 'string', name: 'gender' },
        { type: 'string', name: 'poultryIds' },
        { type: 'string', name: 'page' },
        { type: 'string', name: 'name' },
      ]
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  }),
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}', ['Poultries'], [
    {
      method: 'get',
      title: 'Get poultry',
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
    {
      method: 'patch',
      title: 'Update poultry',
      objectSchema: updatePoultrySchema,
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }, { type: 'string', name: 'poultryId' }]
  }),
  ...createDoc('/poultries/{poultryId}', ['Poultries'], [
    {
      method: 'get',
      title: 'Get poultry directly',
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
  ], {
    pathVariables: [{ type: 'string', name: 'poultryId' }]
  }),
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/images', ['Poultry images'], [
    {
      method: 'post',
      title: 'Register poultry image',
      files: ['files'],
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
    {
      method: 'get',
      title: 'Get poultry images',
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }, { type: 'string', name: 'poultryId' }]
  }),
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/images/{imageId}', ['Poultry images'], [
    {
      method: 'delete',
      title: 'Remove poultry image',
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
  ], {
    pathVariables: [
      { type: 'string', name: 'breederId' },
      { type: 'string', name: 'poultryId' },
      { type: 'string', name: 'imageId' }
    ]
  }),
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/registers', ['Poultry registers'], [
    {
      method: 'post',
      title: 'Register poultry register',
      files: ['files'],
      objectSchema: storeRegisterSchema,
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
    {
      method: 'get',
      title: 'Get poultry registers',
      queryParams: [{ type: 'string', name: 'registerType' }],
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }, { type: 'string', name: 'poultryId' }]
  }),
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/transfer', ['Poultry transfer'], [
    {
      method: 'post',
      title: 'Transfer poultry',
      objectSchema: transferPoultrySchema,
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }, { type: 'string', name: 'poultryId' }]
  }),
  ...createDoc('/breeders/{breederId}/poultries/{poultryId}/kill', ['Poultry kill'], [
    {
      method: 'post',
      title: 'Kill poultry',
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }, { type: 'string', name: 'poultryId' }]
  }),
  ...createDoc('/poultries', ['Poultries'], [
    {
      method: 'get',
      title: 'Search poultries',
      queryParams: [
        { type: 'string', name: 'gender' },
        { type: 'string', name: 'poultryIds' },
        { type: 'string', name: 'genderCategory' },
        { type: 'string', name: 'type' },
        { type: 'string', name: 'tail' },
        { type: 'string', name: 'dewlap' },
        { type: 'string', name: 'crest' },
        { type: 'string', name: 'description' },
        { type: 'string', name: 'name' },
        { type: 'string', name: 'forSale' },
        { type: 'string', name: 'page' },
      ],
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    }
  ]),
}

export default poultryDocs
