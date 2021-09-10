import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storePoultrySchema } from '@Schemas/PoultrySchemas'

const userDocs = {
  ...createDoc('/poultries', ['Poultries'], [
    {
      method: 'post',
      title: 'Store poultry',
      objectSchema: storePoultrySchema,
    }
  ]),
}

export default userDocs
