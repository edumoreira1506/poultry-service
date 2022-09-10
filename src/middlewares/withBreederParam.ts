import {  withRequestParam } from '@cig-platform/core'

import BreederController from '@Controllers/BreederController'
import Breeder from '@Entities/BreederEntity'

export default withRequestParam<Breeder>('breederId', 'breeder', BreederController)
