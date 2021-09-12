import {  withRequestParam } from '@cig-platform/core'

import PoultryController from '@Controllers/PoultryController'
import PoultryRepository from '@Repositories/PoultryRepository'
import Poultry from '@Entities/PoultryEntity'

export default withRequestParam<PoultryRepository, Poultry>('poultryId', 'poultry', PoultryController)
