import {  withRequestParam } from '@cig-platform/core'

import Breeder from '@Entities/BreederEntity'
import BreederRepository from '@Repositories/BreederRepository'

export default withRequestParam<Breeder>('breederId', 'breeder', BreederRepository)
