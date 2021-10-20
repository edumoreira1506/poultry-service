import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storeBreederContactSchema } from '@Schemas/BreederContactSchema'

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
      title: 'Remove contact'
    }
  ], {
    pathVariables: [{ type: 'string', name: 'contactId' }, { type: 'string', name: 'breederId' }]
  })
}

export default breederContactDocs
