import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storeBreederContactSchema, updateBreederContactSchema } from '@Schemas/BreederContactSchema'

const breederContactDocs = {
  ...createDoc('/breeders/{breederId}/contacts', ['Contacts'], [
    {
      method: 'post',
      title: 'Store contact',
      objectSchema: storeBreederContactSchema,
    },
    {
      method: 'get',
      title: 'Get contacts'
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  }),
  ...createDoc('/breeders/{breederId}/contacts/{contactId}', ['Contacts'], [
    {
      method: 'delete',
      title: 'Remove contact',
    },
    {
      method: 'patch',
      title: 'Update contact',
      objectSchema: updateBreederContactSchema
    }
  ], {
    pathVariables: [{ type: 'string', name: 'contactId' }, { type: 'string', name: 'breederId' }]
  }),
  ...createDoc('/breeders/{breederId}/contacts/{contactId}/rollback', ['Contacts'], [
    {
      method: 'post',
      title: 'Rollback breeder contact',
    },
  ], {
    pathVariables: [{ type: 'string', name: 'contactId' }, { type: 'string', name: 'breederId' }]
  })
}

export default breederContactDocs
