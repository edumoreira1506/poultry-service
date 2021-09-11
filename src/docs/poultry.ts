import createDoc from '@cig-platform/docs/build/docs/createDoc'

import { storePoultrySchema } from '@Schemas/PoultrySchemas'

const poultryDocs = {
  ...createDoc('/poultries', ['Poultries'], [
    {
      method: 'post',
      title: 'Store poultry',
      objectSchema: storePoultrySchema,
    }
  ]),
}

export default poultryDocs
