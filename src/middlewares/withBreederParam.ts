import {  withRequestParam } from '@cig-platform/core'

import BreederController from '@Controllers/BreederController'
import BreederRepository from '@Repositories/BreederRepository'
import Breeder from '@Entities/BreederEntity'

export default withRequestParam<BreederRepository, Breeder>('breederId', 'breeder', BreederController)
