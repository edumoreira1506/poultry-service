import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storePoultrySchema } from '@Schemas/PoultrySchemas'

const poultryDocs = {
  ...createDoc('/breeders/{breederId}/poultries', ['Poultries'], [
    {
      method: 'post',
      title: 'Register poultry',
      objectSchema: storePoultrySchema,
    },
    {
      method: 'get',
      title: 'Get poultries'
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  })
}

export default poultryDocs
