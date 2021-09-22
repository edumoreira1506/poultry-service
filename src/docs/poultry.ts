import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storePoultrySchema, updatePoultrySchema } from '@Schemas/PoultrySchemas'

const poultryDocs = {
  ...createDoc('/poultries', ['Poultries'], [
    {
      method: 'post',
      title: 'Store poultry',
      objectSchema: storePoultrySchema,
    },
    {
      method: 'get',
      title: 'Get poultries'
    }
  ]),
  ...createDoc('/poultries/{poultryId}', ['Poultries'], [
    {
      method: 'get',
      title: 'Get poultry',
    },
    {
      method: 'patch',
      title: 'Update poultry',
      objectSchema: updatePoultrySchema
    }
  ], {
    pathVariables: [{ type: 'string', name: 'poultryId' }]
  })
}

export default poultryDocs
