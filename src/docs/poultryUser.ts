import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storePoultryUserSchema } from '@Schemas/PoultryUserSchema'

const poultryUserDocs = {
  ...createDoc('/poultries/{poultryId}/users', ['Poultry users'], [
    {
      method: 'post',
      title: 'Store poultry user',
      objectSchema: storePoultryUserSchema,
    },
  ], {
    pathVariables: [{ type: 'string', name: 'poultryId' }]
  })
}

export default poultryUserDocs
